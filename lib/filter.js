'use strict';

if(!process.env.DEBUG){
  return (module.exports = null);
}

var path = require('path');
var debug = process.env.DEBUG.trim().split(/\#/);

exports = module.exports = {
  skipFile: function flagsSkipFile(filename){
    return !(this.star || this.path.test(filename));
  }
};

exports.path = new RegExp(
  debug[0].split(/[, ]+/).map(function(filename){
    if(filename === '*'){ return (exports.star = true); }

    filename = filename.replace(/\*+/g, function($0){
      if($0.length > 1){ return '[^ ]+(?=[' + path.sep + '])'; }
      return '[^' + path.sep + ' ]+';
    });

    if(/(?:\/|\\\\)$/.test(filename)){
      filename += '[^\\/ ]+.js';
    } else if(!path.extname(filename)){
      filename += '.js';
    }

    return '^' + path.resolve(filename) + '$';
  }).join('|').replace(/[./\\]/g, '\\$&')
);

if(debug.length < 2){ return ; }

exports.fn = {};

debug.slice(1).forEach(function(name){
  exports.fn[name] = true;
});
