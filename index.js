'use strict';

var path = require('path');
var callers = require('v8-callsites');
var monkey = require('stdout-monkey')();
var ws = require('fs').createWriteStream('log');

var DEBUG = (process.env.DEBUG || '').trim().split(',');

var batch = { }, registry = { };
var wd = process.cwd();

function stdout(line){
  var frame = callers(console.log)[0];
  var file = path.relative(wd, frame.getFileName()) || './.';

  if( !registry[file] ){
    monkey.write(line);
    return ;
  } else if (!DEBUG || DEBUG.indexOf(file.replace(path.extname(file), '')) < 0){
    return ;
  }

  frame = ('at '+frame+'').replace(wd+path.sep, '')+'\n';
  batch.file = batch.file || file;
  batch.frame = batch.frame || frame;

  if( batch.timer ){
    clearTimeout(batch.timer);
    delete batch.timer;
  }

  if( batch.file !== file ){
    monkey.write(batch.data.join(''));
    frame = ('at '+frame+'').replace(wd+path.sep, '')+'\n';
    batch = {
       file : file,
      frame : frame
    };
  }

  batch.data = batch.data || [ ];
  if( batch.data.indexOf(frame) < 0 ){
    batch.data.push(frame);
  }
  batch.data.push(line);

  batch.timer = setTimeout(function(){
    if(batch.data){
      monkey.write(batch.data.join(''));
      batch = { };
    }
  });
}
monkey.patch(stdout);

process.on('exit', function(){
  if(batch.data){
    monkey.write(batch.data.join(''));
  }
});

function enable(){
  var file = callers(enable)[0].getFileName();
  registry[path.relative(wd, file) || './.'] = true;
  return exports;
}

exports = module.exports = {
  enable : enable
};
