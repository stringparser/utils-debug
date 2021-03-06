# utils-debug [![NPM version][npm-badge]][npm-link][![downloads][downloads-bagde]][npm-link]

[documentation](#documentation) -
[install](#install) -
[tests](#tests)
[todo](#todo) -
[why](#why)

[![build][build-badge]][build-link]

unobtrusive debug utility

## example

```js
var debug = require('utils-debug')();

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
```

use **filenames** instead of mnemonics

```
$ DEBUG=example.js node example.js
at Object.<anonymous> (example.js:5:1)
hey there
at fn1 (example.js:10:3)
simple
and easy
debug
at fn2 (example.js:18:3)
if you need it
at fn3 (example.js:23:3)
just like...
... you had imagined
```

filter by **function name**

```
$ DEBUG=*#fn1#fn2 node example.js
fn1 (example.js:10:3)
 simple and easy debug
fn2 (example.js:21:3)
 just like...
 ... you had imagined
```

## documentation

The module exports a function factory that takes no arguments.

```js
var Debug = require('utils-debug');
```

_returns_
 - `noop` (empty function) if there was no `process.env.DEBUG`
 - `noop` if the file did not pass the checks given by the flags
 - `debug` function that uses the same format as `console.log`

```js
var Debug = require('utils-debug');
var debug = Debug();

debug('hey there'); fn();

function fn(){
  debug('%s', 'simple stuff');
}
```

### filters

To enable `debug` functions that live in your code there are three types of filters.

#### paths separated by comma

```sh
$ DEBUG=lib/dir/,lib/file1,lib/file2.js node program.js
```

The extension is optional. If a path ends with slash (forward or backward) _it will be considered
a directory_.

> NOTE: paths have to be relative to the [CWD](https://en.wikipedia.org/wiki/Working_directory#In_operating_systems)

#### function names starting with a pound sign

```sh
$ DEBUG=*#method1#method2 node program.js
```

#### wilcards

 - `DEBUG=*` will match any file(s)
 - `DEBUG=folder/*/*` any file one dir deep after `folder`
 - `DEBUG=folder/*/file.js` matches any directory after `folder` 1 folder deep
 - `DEBUG=folder/**` any file after directory `folder` with any folder depth
 - `DEBUG=folder/**/file.js` any file after directory `folder` with any folder depth that ends up on `file.js`

## why

You want expressive, unobtrusive debugging.

## install

With [npm][npm-link]
```sh
$ npm install utils-debug
```

## tests

To run the tests
```
  $ npm test
```

output
```
  filter
    ✓ resolves filepaths from CWD
    ✓ files should not need extension
    ✓ files should be separated by comma
    ✓ DEBUG=* makes util.filter.star = true
    ✓ DEBUG=folder/ or would be treated as file
    ✓ DEBUG=folder/* does not qualify as *
    ✓ DEBUG=folder/*#method is labeled as fn flag
    ✓ DEBU=folder/*#method1#method2 to filter more than one

  skipFile
    ✓ * does not skip any files
    ✓ folder/file.js skips any other file
    ✓ folder/*/file.js is wilcard for only one folder deep
    ✓ folder/*/file.js skips any other files
    ✓ folder/**/file.js is wilcard for any one folder depth
    ✓ folder/**/file.js skips any other files

  14 passing (34ms)
```

## todo

- [ ] aliasing (to use it instead of filename)
- [ ] glob matching

### license

The MIT License (MIT)

Copyright (c) 2014-present Javier Carrillo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm-link]: http://www.npmjs.org/package/utils-debug
[npm-badge]: http://img.shields.io/npm/v/utils-debug.svg?style=flat-square

[build-link]: https://travis-ci.org/stringparser/utils-debug/builds
[build-badge]: http://img.shields.io/travis/stringparser/utils-debug/master.svg?style=flat-square

[license-link]: http://opensource.org/licenses/MIT
[license-badge]: http://img.shields.io/npm/l/utils-debug.svg?style=flat-square

[downloads-bagde]: http://img.shields.io/npm/dm/utils-debug.svg?style=flat-square
