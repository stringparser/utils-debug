'use strict';

var path = require('path');

it('* does not skip any files', function(){
  process.env.DEBUG = '*';
  var util = process.reset('./lib/util');
  util.filter.skipFile('filenamehere.js')
    .should.be.eql(false);
});

it('folder/file.js skips any other file', function(){
  process.env.DEBUG = 'folder/file.js';
  var util = process.reset('./lib/util');

  util.filter.skipFile(path.resolve('folder/file.js'))
    .should.be.eql(false);

  util.filter.skipFile(path.resolve('folder/otherfile.js'))
    .should.be.eql(true);
});

it('folder/*/file.js is wilcard for only one folder deep', function(){
  process.env.DEBUG = 'folder/*/file.js';
  var util = process.reset('./lib/util');

  util.filter.skipFile(path.resolve('folder/dir/here/file.js'))
    .should.be.eql(true);
});

it('folder/*/file.js skips any other files', function(){
  process.env.DEBUG = 'folder/*/file.js';
  var util = process.reset('./lib/util');

  util.filter.skipFile(path.resolve('folder/dir/file.js'))
    .should.be.eql(false);

  util.filter.skipFile(path.resolve('folder/dir/otherfile.js'))
    .should.be.eql(true);
});

it('folder/**/file.js is wilcard for any one folder depth', function(){
  process.env.DEBUG = 'folder/**/file.js';
  var util = process.reset('./lib/util');

  util.filter.skipFile(path.resolve('folder/dir/here/file.js'))
    .should.be.eql(false);
});

it('folder/**/file.js skips any other files', function(){
  process.env.DEBUG = 'folder/**/file.js';
  var util = process.reset('./lib/util');

  util.filter.skipFile(path.resolve('folder/dir/here/file.js'))
    .should.be.eql(false);

  util.filter.skipFile(path.resolve('folder/dir/here/otherfile.js'))
    .should.be.eql(true);
});
