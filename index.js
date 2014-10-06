'use strict';

var path = require('path');
var callers = require('v8-callsites');
var monkey = require('stdout-monkey')();
var ws = require('fs').createWriteStream('log');

var wd = process.cwd();
var registry = { };

var batch = { };
function spy(line){
  var frame = callers(console.log)[0];

  var file = path.relative(wd, frame.getFileName()) || './.';
  if( registry[file] === void 0 ){
    monkey.write(line);
    return ;
  }

  frame = (' at '+frame+'').replace(wd, '.')+'\n';

  batch.file = batch.file || file;
  batch.frame = batch.frame || frame;

  if( batch.timer ){
    clearTimeout(batch.timer);
    delete batch.timer;
  }

  if( batch.frame !== frame ){
    monkey.write(batch.frame);
    monkey.write(batch.data.join(''));
    batch = {
       file : file,
      frame : frame
    };
  }

  batch.data = batch.data || [];
  if( batch.data.indexOf(frame) < -1 ){
    batch.data.push(frame);
  }
  batch.data.push('  '+line);

  ws.write('waiting...\n'+ JSON.stringify(batch, null, ' ')+'\n');

  batch.timer = setTimeout(function(){
    if(batch.data){
      monkey.write(batch.frame);
      monkey.write(batch.data.join(''));
      delete batch.timer;
      ws.write('timer kicks\n'+ JSON.stringify(batch, null, ' ')+'\n');
      batch = { };
    }
  });
}
monkey.patch(spy);

function enable(){
  var file = callers(enable)[0].getFileName();
  registry[path.relative(wd, file) || './.'] = true;
  return exports;
}

exports = module.exports = {
  enable : enable
};
