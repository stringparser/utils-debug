'use strict';

var site = require('v8-callsites');
var util = require('./lib/utils');

exports = module.exports = {
  enable : enable
};

var arr = [];
/*var __push = arr.forEach;*/
var __forEach = arr.forEach;

var batch = { };

function enable(filename){

  var filerel = util.relative(
    filename || site(enable)[0].getFileName()
  );

  if( util.skip(filerel) ){
    return function debugSkipped(){ };
  }

  debug.filename = filerel;

  function debug(/* arguments */){

    var frame = site(debug);
    var file = debug.filename;

    if( util.skip(file, frame[0]) ){
      return ;
    }

    var shot = util.relative(''+frame[0]);
    batch.data = batch.data || [shot];

    if( util.regexpOf(batch.data, shot, ':') < 0 ){
      batch.data.push(shot);
    }

    if( debug.filename !== file ){
      console.log(batch.data.join('\n'));
      batch = { time : process.hrtime() };
      return ;
    }

    var index = batch.data.push(' ') - 1;
    __forEach.call(arguments, function(elem){
      if(typeof elem !== 'string'){
        batch.data[index] += ' '
          + util.inspect(elem, { colors : true });
      }
      batch.data[index] += elem;
    });

    clearTimeout(batch.timer);
    delete batch.timer;

    batch.timer = setTimeout(function(){
      if(batch.data){
        console.log(batch.data.join('\n'));
        batch = { };
      }
    });
  }

  return debug;
}

process.once('exit', function(){
  if(batch.data){
    util.console(batch.data);
  }
});

exports.enable = enable;
