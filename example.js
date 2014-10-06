'use strict';

require('./.').enable();

console.log('hello!');

someMethod();

function someMethod(){
  console.log('what up!');
  console.log('hey dowg');
  otherMethod();
}

function otherMethod(){
  console.log('something different');
}


