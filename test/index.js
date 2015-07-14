'use strict';

require('should');
var fs = require('fs');
var path = require('path');

// tests shortcut
process.reset = function resetModule(pathname){
  pathname = path.resolve(pathname);
  if(!path.extname(pathname)){ pathname += '.js'; }
  if(!require.cache[pathname]){ return require(pathname); }

  (require.cache[pathname].children || []).forEach(function(child){
    if(/node_modules/.test(child.filename)){ return ; }
    delete require.cache[child.filename];
  });

  delete require.cache[pathname];
  return require(pathname);
};

fs.readdirSync('test').forEach(function(file){
  var ext = path.extname(file);
  if(!ext || file === 'index.js'){ return ; }
  describe(path.basename(file, ext), function(){
    require(path.resolve('test', file));
  });
});
