
var path = require('path');
var callers = require('v8-callsites');
var monkey = require('stdout-monkey')();

var wd = process.cwd();
var registry = { };

function debug(line){
  var frame = callers(console.log);
  var file = path.relative(wd, frame.getFileName());

  if( registry[file] === void 0 ){
    monkey.write(line);
    return ;
  }

  var badge = ' '+caller.location+' ';

}
monkey.patch(debug);