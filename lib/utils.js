'use strict';

var path = require('path');
var util = require('util');

/*var callers = require('callers-module');*/

var _registry = { };
var _method = { };
var wd = process.cwd();
var DEBUG = (process.env.DEBUG || '').trim().split(',')
    .map(function(filename){
      var file = filename.split('#');
      file[0] = relative(file[0], { noext : true });
      _method[file[0]] = file.slice(1);
      return file[0];
    });

function register(pathrel){
  _registry[pathrel] = true;
}

function registry(pathrel){
  return (
       _registry[pathrel]
    || _method['*']
    || false
  );
}

function skip(pathrel, frame){
  var ret;
  if( DEBUG.indexOf(pathrel) > -1 || DEBUG[0] === '*' ){
    ret = registry(pathrel) ? false : true;
  }

  if( !frame ){
    return ret;
  }

  var methods = _method[pathrel] || _method['*'] || [ ];
  if( !methods[0] ){
    return ret;
  }

  var index = -1, len = methods.length;
  var method = (frame+'').match(/(.*) \(.*\)/)[1];
  while(++index < len){
    index = methods.indexOf(method) > -1
      ? len + index
      : index;
  }
  // -1 => not found => true to skip
  return index-len-1 < 0;
}

function relative(str, opt){
  opt = opt || { };
  var relre = new RegExp(escapeRegExp(wd+path.sep), 'g');
  var ret = str.replace(relre, '');
  if( opt.noext || str[0] === path.sep ){
    ret = ret.replace(path.extname(str), '') || './.';
  }
  return ret;
}

function regexpOf(arr, pattern, character){
  var index = -1;
  var len = arr.length;
  var reg = escapeRegExp(pattern, character);
  while(++index < len){
    index = arr[index].match(reg)
      ? len + index
      : index;
  }
  return index-len-1;
}

function escapeRegExp(pattern, character) {
  return (
    character
      ? pattern.substring(0, pattern.indexOf(character))
      : pattern
  ).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

module.exports = {
       DEBUG : DEBUG,
        skip : skip,
     inspect : util.inspect,
    regexpOf : regexpOf,
    relative : relative,
    register : register,
    registry : registry
};
