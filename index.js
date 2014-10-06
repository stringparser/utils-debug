'use strict';

var merge = require('lodash.merge');
var site = require('v8-callsites');
var monkey = require('stdout-monkey')();

var batch = { };
var util = require('./lib/utils');

function stdout(line){

  var frame = site(console.log)[0];
  var file = util.relative(frame.getFileName());

  if( util.skip(file, monkey, line) ){
    return ;
  }

  var shot = util.relative('at '+frame) + '\n';
  batch.data = batch.data || [shot];
  batch.file = batch.file || file;
  batch.shot = batch.shot || shot;

  if( util.regexpOf(batch.data, shot, monkey) < 0 ){
      batch.data.push(shot);
  }

  if( batch.file !== file ){
    monkey.write(batch.data.join(''));
    batch = { file : file, shot : shot };
    return ;
  }

  batch.data.push(line);

  clearTimeout(batch.timer);
  delete batch.timer;
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

exports = module.exports = merge({ }, monkey);
exports.enable = util.enable;
