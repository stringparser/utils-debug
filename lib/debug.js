'use strict';

if(!process.env.DEBUG){
  return (module.exports = null);
}

var path = require('path');
var debug = process.env.DEBUG.trim().split(/\#/);

exports = module.exports = {
  path: {},
  skipFile: function flagsSkipFile(filename){
    return !(
      this.star ||
      this.path[filename] ||
      this.path[path.dirname(filename)]
    );
  }
};

debug[0].split(/[, ]+/).map(function(filename){
  if(/\*/.test(filename)){
    if(filename === '*'){ return (exports.star = true); }
    filename = filename.split('*')[0] || '';
  } else if(!/[\\//]+$/.test(filename) && !path.extname(filename)){
    filename += '.js';
  }

  exports.path[path.resolve(filename)] = true;
});

if(debug.length < 2){ return ; }

exports.fn = {};

debug.slice(1).forEach(function(name){
  exports.fn[name] = true;
});
