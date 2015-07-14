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
    filename = path.resolve(filename.split('*')[0] || '');
  } else if(/[\\//]$/.test(filename)){
    filename = path.resolve(filename, '..');
  } else if(!path.extname(filename)){
    filename = path.resolve(filename + '.js');
  }

  exports.path[filename] = true;
});

if(debug.length < 2){ return ; }

exports.fn = {};

debug.slice(1).forEach(function(name){
  exports.fn[name] = true;
});
