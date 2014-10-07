'use strict';

var debug = require('./.').enable(__filename);

debug('hey there');

someMethod();

function someMethod(){
  debug('simple and easy');
  debug('debug');
  otherMethod();
}

function otherMethod(){
  debug('with useful information');
  yetAnother();
}

function yetAnother(){
  debug('just like...');
  debug('... you had imagined');
}


