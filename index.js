'use strict';

var path = require('path');
var util = require('./lib/util');

exports = module.exports = Debug;

var files;
var noStar = true;
var currentFrame;
function debugDisabled(){}

if(process.env.DEBUG){
  files = process.env.DEBUG.trim().split(/[, ]+/).map(function(filename){
    if(filename === '*'){ noStar = false; return filename; }
    if(!path.extname(filename)){ filename += '.js'; }
    return path.resolve('.', filename);
  }).join(' ');
}

function Debug(filename){
  if(!files){ return debugDisabled; } else if(typeof filename !== 'string'){
    filename = util.callsites(Debug)[0].getFileName();
  }

  if(noStar && files.indexOf(filename) < 0){
    return debugDisabled;
  }

  var cwd = process.cwd();
  var filerel = '.' + path.sep + path.relative(cwd, filename);

  function debug(/* arguments */){
    var frame = ('at ' + util.callsites(debug)).replace(filename, filerel);
    debug.frame = frame.replace(/\:.+/, '');
    if(debug.frame !== currentFrame){
      console.log(frame,
        debug.time && util.prettyTime(process.hrtime(debug.time)) || ''
      );
      debug.time = process.hrtime();
    }

    console.log.apply(console,
      util.map.call(arguments, function(arg){
        if(typeof arg === 'string'){ return arg; }
        return util.inspect(arg, {colors: true});
      })
    );

    currentFrame = debug.frame;
  }

  return debug;
}
