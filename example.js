'use strict';

var debug = require('./.')();

debug('hey there');

fn1();

function fn1(){
  debug('%s', 'simple');
  debug('and easy');
  debug('debug');
  fn2();
}

function fn2(){
  debug('if you need it');
  fn3();
}

function fn3(){
  debug('just like...');
  debug('... you had imagined');
}
