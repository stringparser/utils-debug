'use strict';

var path = require('path');
var callers = require('v8-callsites');

var registry = { };
var wd = process.cwd();
var DEBUG = (process.env.DEBUG || '').trim().split(',');

function skip(file, monkey, line){

  if( !registry[file] ){
    monkey.write(line);
  } else if( DEBUG[0] === '*' || DEBUG.indexOf(file) > -1 ){
    return false;
  }
  return true;
}

function enable(){
  var file = callers(enable)[0].getFileName();
  registry[relative(file)] = true;
  return exports;
}

function relative(pathname){
  if( pathname[0] === path.sep ){
    return path.relative(wd+path.sep, pathname) || './.';
  }
  return pathname.replace(wd+path.sep, '');
}

function noext(pathname){
  return pathname.replace(path.extname(pathname), '');
}

function regexpOf(arr, re){
  if(Array.isArray(arr)){
    var index = -1;
    var len = arr.length;
    re = re.substring(0, re.indexOf(':'))
           .replace('(', '\\(');
    while(++index < len){
      index = arr[index].match(re)
        ? len + index
        : index;
    }
    return index-len-1;
  }
  return -1;
}

module.exports = {
     DEBUG : DEBUG,
      skip : skip,
     noext : noext,
    enable : enable,
  relative : relative,
  regexpOf : regexpOf
};
