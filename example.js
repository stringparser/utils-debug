'use strict';

require('./.').enable();

console.log('hey there');

someMethod();

function someMethod(){
  console.log('simple and easy');
  console.log('debug');
  otherMethod();
}

function otherMethod(){
  console.log('with useful information');
  yetAnother();
}

function yetAnother(){
  console.log('just like...');
  console.log('... you had imagined');
}


