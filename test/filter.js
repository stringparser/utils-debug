'use strict';

var path = require('path');

it('resolves filepaths from CWD', function(){
  process.chdir('./test');
  process.env.DEBUG = 'folder/file.js';
  var util = process.reset('../lib/util.js');
  process.chdir(path.dirname(process.cwd()));
  path.resolve('test', 'folder', 'file.js')
    .should.match(util.filter.path);
});

it('files should not need extension', function(){
  process.env.DEBUG = 'folder/file';
  var util = process.reset('./lib/util.js');
  path.resolve('folder', 'file.js')
    .should.match(util.filter.path);
});

it('files should be separated by comma', function(){
  process.env.DEBUG = 'folder/file1.js,folder/file2.js';
  var util = process.reset('./lib/util.js');
  process.env.DEBUG.split(/[, ]+/).forEach(function(filepath){
    path.resolve(filepath)
      .should.match(util.filter.path);
  });
});

it('DEBUG=* makes util.filter.star = true', function(){
  process.env.DEBUG = '*';
  var util = process.reset('./lib/util.js');
  util.filter.star.should.be.eql(true);
});

it('DEBUG=folder/ or would be treated as file', function(){
  process.env.DEBUG = 'folder/';
  var util = process.reset('./lib/util.js');
  path.resolve('folder/file.js')
    .should.match(util.filter.path);
});

it('DEBUG=folder/* does not qualify as *', function(){
  process.env.DEBUG = 'folder/*';
  var util = process.reset('./lib/util.js');
  (util.filter.star === void 0).should.be.eql(true);
  path.resolve('folder/file.js').should.match(util.filter.path);
});

it('DEBUG=folder/*#method is labeled as fn flag', function(){
  process.env.DEBUG = 'folder/*#method';
  var util = process.reset('./lib/util.js');
  util.filter.fn.should.have.property('method', true);
  path.resolve('folder/file.js').should.match(util.filter.path);
});

it('DEBU=folder/*#method1#method2 to filter more than one', function(){
  process.env.DEBUG = 'folder/*#method1#method2';
  var util = process.reset('./lib/util.js');
  path.resolve('folder/file.js').should.match(util.filter.path);
  util.filter.fn.should.have.properties({
    method1: true,
    method2: true
  });
});
