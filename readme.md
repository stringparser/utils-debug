# utils-debug [<img alt="progressed.io" src="http://progressed.io/bar/99" align="right"/>](https://github.com/fehmicansaglam/progressed.io)

[<img alt="build" src="http://img.shields.io/travis/stringparser/utils-debug/master.svg?style=flat-square" align="left"/>](https://travis-ci.org/stringparser/utils-debug/builds)
[<img alt="NPM version" src="http://img.shields.io/npm/v/utils-debug.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/utils-debug)

wee, unintrusive debugging

## install

    npm install --save utils-debug

## example

```js
'use strict';

var debug = require('./.').enable();

console.log('hello');

someMethod();

function someMethod(){
  console.log('what up!');
}
```

and like you are [used to](https://github.com/visionmedia/debug)

```sh
➜  utils-debug (master) ✗ DEBUG=example node example
at Object.<anonymous> (example.js:5:9)
hello
at someMethod (example.js:10:11)
what up!
```

### documentation

```js
require('utils-debug').enable();
```

Thats basically *it*.

All `console.log`s of that file will not print to `stdout` if there is no **DEBUG** environment variable set. 

With that, just run it as you usually do with [debug](https://github.com/visionmedia/debug) but instead of using some label you wrote on the source code of some file, **use the path of the file** relative to the project. That is if you project looks like below

```
project-dir
 |-- lib
     |--> code.js
 |-- test
     |--> code.js
 |-- index.js
```

and want to debug `lib/code.js`

## why

You want expressive, unintrusive debugging.

## todo

 - [ ] make some tests
 - [ ] be able to format the output as much as one likes
 - [ ] sorten debugging paths for `node_modules` directory

### license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/utils-debug.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)
