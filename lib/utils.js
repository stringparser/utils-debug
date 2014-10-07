'use strict';

var path = require('path');
var util = require('util');

/*var callers = require('callers-module');*/

var _registry = { };
var wd = process.cwd();
var DEBUG = (process.env.DEBUG || '').trim().split(',')
    .map(function(filename){
      var file = filename.split('#');
      var method = file.slice(1);
      file[0] = relative(file[0], { noext : true });
      register(file[0], method);
      return file[0];
    });

function register(pathrel, method){
  _registry[pathrel] = method
    ? { method : method }
    : { };
  console.log(_registry);
}

function registry(pathrel){
  return (
       _registry[pathrel]
    || _registry['*']
    || { }
  );
}

function skip(pathrel, frame){
  var ret = DEBUG.indexOf(pathrel) > -1
    ? !_registry[pathrel]
    : DEBUG[0] !== '*';

  var methods = registry(pathrel).method;
  if( !methods[0] || !frame ){
    return ret;
  }

  var method =
    frame.getFunctionName()
    || frame.getMethodName();

  var index = -1, len = methods.length;
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
  ).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
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
