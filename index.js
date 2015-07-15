'use strict';

var path = require('path');
var util = require('./lib/util');

exports = module.exports = Debug;

var cwd = process.cwd();
var currentFrame;

function debugDisabled(){}

function Debug(/* no arguments */){
  if(!util.filter){ return debugDisabled; }

  var filename = util.callsites(Debug, 1)[0].getFileName();
  if(util.filter.skipFile(filename)){ return debugDisabled; }
  var filerel = path.relative(cwd, filename);

  function debug(/* arguments */){
    var site = util.callsites(debug, 1).toString();
    var frame = site.match(/([^ ]+)[^:]+/);
    if(util.filter.fn && !util.filter.fn[frame[1]]){ return ; }

    if(frame[0] !== currentFrame){
      console.log('at', site.replace(filename, filerel));
    }

    console.log.apply(console,
      util.map.call(arguments, function(arg){
        if(typeof arg === 'string'){ return arg; }
        return util.inspect(arg, {colors: true});
      })
    );

    currentFrame = frame[0];
  }

  return debug;
}
