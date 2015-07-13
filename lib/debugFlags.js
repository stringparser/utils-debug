'use strict';

if(!process.env.DEBUG){
  return (module.exports = null);
}

var path = require('path');
var debug = process.env.DEBUG.trim().split(/\#/);

exports = module.exports = {
  file: {},
  noStar: true
};

debug[0].split(/[, ]+/).map(function(filename){
  if(!/\*/.test(filename)){
    if(!path.extname(filename)){ filename += '.js'; }
    exports.file[path.resolve('.', filename)] = true;
    return ;
  }

  exports.noStar = false;
  if(filename === '*'){ return ; }
  if(!exports.starDir){ exports.starDir = {}; }
  exports.starDir[path.resolve(filename.split('*')[0] || '')] = true;
});

if(debug.length < 2){ return ; }

exports.fn = {};
debug.slice(1).forEach(function(name){
  exports.fn[name] = true;
});
