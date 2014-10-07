'use strict';

var site = require('v8-callsites');
var monkey = require('stdout-monkey')();
var prettyTime = require('pretty-hrtime');

var batch = { };
var util = require('./lib/utils');

function debug(line){

  var frame = site(console.log)[0];
  var file = util.relative(frame.getFileName());

  if( !util.registry(file) ){
    return monkey.write(line);
  }

  if( util.skip(file) ){
    return ;
  }

  batch.time = batch.time || process.hrtime();
  var shot = util.relative('at '+frame + '\n');

  batch.file = batch.file || file;
  batch.data = batch.data || [];

  if( util.regexpOf(batch.data, shot) < 0 ){
    batch.data.push(shot);
  }

  if( batch.file !== file ){
    monkey.write(batch.data.join(''));
    batch = {
      file : file,
      time : process.hrtime()
    };
    return ;
  }

  batch.data.push(' '+line);

  clearTimeout(batch.timer);
  delete batch.timer;
  batch.timer = setTimeout(function(){
    if(batch.data){
      monkey.write(batch.data.join(''));
      batch = { };
    }
  });
}

monkey.patch(debug);

process.once('exit', function(){
  if(batch.data){
    monkey.write(batch.data.join(''));
  }
});

function enable(){
  util.register(enable);
  return module.exports;
}

module.exports =  {
   enable : enable,
   monkey : monkey,
    write : debug
};
