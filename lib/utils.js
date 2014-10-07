'use strict';

var path = require('path');
var callers = require('callers-module');

var _registry = { };
var wd = process.cwd();
var DEBUG = (process.env.DEBUG || '').trim().split(',')
    .map(function(filename){
      return filename.replace(path.extname(filename),'');
    });

function register(origin){
  var caller = callers(origin);
  var pathrel = relative(caller.path);
  if( !_registry[pathrel] ){
    _registry[pathrel] = caller;
  }
}

function registry(pathrel){
  return pathrel ? _registry[pathrel] : _registry;
}

function skip(pathrel){
  return DEBUG.indexOf(pathrel) > -1 ? false : DEBUG[0] !== '*';
}

function relative(pathname){
  if( pathname[0] === path.sep ){
    return (
      path.relative(wd+path.sep, pathname)
          .replace(path.extname(pathname),'')
      || './.'
    );
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
    regexpOf : regexpOf,
    relative : relative,
    register : register,
    registry : registry
};
