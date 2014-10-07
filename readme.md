# utils-debug [<img alt="progressed.io" src="http://progressed.io/bar/75" align="right"/>](https://github.com/fehmicansaglam/progressed.io)

[<img alt="build" src="http://img.shields.io/travis/stringparser/utils-debug/master.svg?style=flat-square" align="left"/>](https://travis-ci.org/stringparser/utils-debug/builds)
[<img alt="NPM version" src="http://img.shields.io/npm/v/utils-debug.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/utils-debug)
<br>
simple debug utility

## example

```js
'use strict';

var debug = require('utils-debug').enable();

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
```

and like you are [used to](https://github.com/visionmedia/debug)

```sh
utils-debug (master) ✗ DEBUG=example node example
at Object.<anonymous> (example.js:5:9)
 hey there
at someMethod (example.js:10:11)
 simple and easy
 debug
at otherMethod (example.js:16:11)
 with useful information
at yetAnother (example.js:21:11)
 just like...
 ... you had imagined
```

but without any other function, just plain old `console.log`

## install

    npm install --save utils-debug


### documentation

```js
var debug require('utils-debug');
    debug.enable();
```

Thats basically *it*. 

All `console.log` of the file will not print to `stdout` if there is no **DEBUG** environment variable set. 

If there is a **DEBUG** environment variable, just run it as you usually do with [debug](https://github.com/visionmedia/debug) but instead of using some label you wrote on the source code of some file **use the path of the file** relative to the project. That is, if you project looks like below

```
project-dir
 |-lib
   |--> code.js
 |-index.js
```

and want to debug `lib/code.js` go ahead and write `DEBUG=lib/code node index.js`. 

And yes, the extension is not necessary.

## why

You want expressive, unintrusive debugging.

## todo

 - [ ] make some tests
 - [ ] be able to format the output as much as one likes
 - [ ] shorten debugging paths for `node_modules` directory

### license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/utils-debug.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)
