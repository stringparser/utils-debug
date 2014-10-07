# utils-debug [<img alt="progressed.io" src="http://progressed.io/bar/75" align="right"/>](https://github.com/fehmicansaglam/progressed.io)

[<img alt="build" src="http://img.shields.io/travis/stringparser/utils-debug/master.svg?style=flat-square" align="left"/>](https://travis-ci.org/stringparser/utils-debug/builds)
[<img alt="NPM version" src="http://img.shields.io/npm/v/utils-debug.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/utils-debug)

<br>
simple debug utility

## example

```js
'use strict';

var debug = require('utils-debug')(__filename);

debug('hey there');

someMethod();

function someMethod(){
  debug('simple and easy debug');
  otherMethod();
}

function otherMethod(){
  debug('with useful information');
  debug('if there is a point to see it')
  yetAnother();
}

function yetAnother(){
  debug('just like...');
  debug('... you had imagined');
}
```

use **filenames** instead of mnemonics

```sh
utils-debug (master) ✔ DEBUG=example node example
at Object.<anonymous> (example.js:5:9)
 hey there
at someMethod (example.js:10:11)
 simple and easy debug
at otherMethod (example.js:16:11)
 with useful information
 if there is a point to see it
at yetAnother (example.js:21:11)
 just like...
 ... you had imagined
```

filter by `function` name

```sh
utils-debug (master) ✔ DEBUG=*#someMethod#yetAnother node example.js
someMethod (example.js:10:3)
 simple and easy debug
yetAnother (example.js:21:3)
 just like...
 ... you had imagined
```

## documentation

```js
var debug = require('utils-debug')([__filename]);

debug('hey there');
```

Thats basically *it*. Passing the `__filename` is optional.

### path filter
> Use <kbd>Tab</kbd> completion.

To enable the debug functions that live in your code use their relative path. 

That is, if you project looks like below

```
project-dir
 |-lib
   |--> code.js
 |-index.js
```

and want to debug `lib/code.js` you simply write

    DEBUG=lib/code.js node index.js

or

    DEBUG=lib/code node index.js 

So yes, the extension is not necessary.

To debug more than one file separate them with comma like so

    DEBUG=lib/code,index node index.js

### function filter
> see how functions flow with no setup

Method names can also be used to enable their output

```sh
utils-debug (master) ✔ DEBUG=*#someMethod#yetAnother node example.js
someMethod (example.js:10:3)
 simple and easy debug
yetAnother (example.js:21:3)
 just like...
 ... you had imagined
```

As you can see above, the wildcard `*` was used followed of '#<function-name>'.

The only difference for this filter is that you have to separate methods with '#' instead of a comma.

### wildcards

At the moment the only wildcard is `*`. This enables debugging for every file if nothing else is specified (see [method-filter](#function-filter)).

    DEBUG=* node index.js 

There are plans to add `glob` matching as well.

## why

You want expressive, unintrusive debugging.

## todo

 - [ ] aliasing
 - [ ] glob matching
 - [ ] make some tests
 - [ ] be able to format the output

### license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/utils-debug.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)
