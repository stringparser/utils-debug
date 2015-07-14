# utils-debug [![NPM version][npm-badge]][npm-link][![downloads][downloads-bagde]][npm-link]

[![build][build-badge]][build-link]
[documentation](#documentation) -
[install](#install) -
[todo](#todo) -
[why](#why)

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

```js
var Debug = require('utils-debug');
```

The module exports a function factory.

```js
  function Debug(/* no arguments */)
```
It returns a noop (empty function) when no flags given (no `process.env.DEBUG`)
or the file is not included on the `process.env.DEBUG` flag.

### filters

Filters are used to enable `debug` functions that live in your code. To be specific: `DEBUG` can contain any of the following patterns

_wilcards_
```sh
$ DEBUG=* node program.js
```

It will make any filename to match. At the moment the only wildcard implemented.

_diretories/filenames paths separated by comma_

```sh
$ DEBUG=lib/dir/,lib/file1,lib/file2.js node program.js
```

The extension is optional. If a path ends with slash (forward or backward) _it will be considered
a directory_.

> NOTE: paths have to be relative to the [CWD](https://en.wikipedia.org/wiki/Working_directory#In_operating_systems)

_function names starting with a pound sign_

```sh
$ DEBUG=*#method1#method2 node program.js
```

_returns_
 - `noop` (empty function) if there was no `process.env.DEBUG`
 - `noop` if the file did not pass the checks given by the flags
 - `debug` function that uses the same format as `console.log`

## why

You want expressive, unobtrusive debugging.

## install

With [npm][npm-link]
```sh
$ npm install utils-debug
```

## todo

- [ ] aliasing (to use it instead of filename)
- [ ] glob matching

### license

[![LICENSE][license-badge]][license-link]

[npm-link]: http://www.npmjs.org/package/utils-debug
[npm-badge]: http://img.shields.io/npm/v/utils-debug.svg?style=flat-square

[build-link]: https://travis-ci.org/stringparser/utils-debug/builds
[build-badge]: http://img.shields.io/travis/stringparser/utils-debug/master.svg?style=flat-square

[license-link]: http://opensource.org/licenses/MIT
[license-badge]: http://img.shields.io/npm/l/utils-debug.svg?style=flat-square

[downloads-bagde]: http://img.shields.io/npm/dm/utils-debug.svg?style=flat-square
