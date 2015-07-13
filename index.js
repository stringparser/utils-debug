'use strict';

var path = require('path');
var util = require('./lib/util');

exports = module.exports = Debug;

var flags = util.debugFlags;
var currentFrame;

function debugDisabled(){}

console.log(flags);

/*
# module.exports
```js
  function Debug([filename])
```
Returns a noop if there are no flags given (no process.env.DEBUG)
or if the file is not included on the process.env.DEBUG flags.

`DEBUG` flags available to filter output are:

- paths separated by comma (relative to the CWD)
  > i.e. lib/file1.js,lib/file2.js (extension is optional)

- star paths separated by comma
  > i.e. lib/*,build/*

- function names starting with a pound sign
  > i.e. *#method1#method2 (* can still filter by function name)

**NOTE**: The factory does not need no arguments

_returns_
 - an empty function (or noop) if there was no `process.env.DEBUG`
 - a `noop` if the file did not pass the checks given by the flags
 - a `debug` function that inspects and uses the same format as console.log
*/

function Debug(/* no arguments */){
  if(!flags){ return debugDisabled; }

  var filename = util.callsites(Debug, 1)[0].getFileName();
  if(flags.noStar && !flags.file[filename]){
    return debugDisabled;
  } else if(flags.starDir && !flags.starDir[path.dirname(filename)]){
    return debugDisabled;
  }

  var filerel = '.' + path.sep + path.relative(process.cwd(), filename);

  function debug(/* arguments */){
    var site = 'at ' + util.callsites(debug, 1)[0];
    var frame = site.match(/^at[ ]+([^ ]+)[^:]+/);
    if(flags.fn && !flags.fn[frame[1]]){ return ; }

    if(frame[0] !== currentFrame){
      console.log(site.replace(filename, filerel));
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
