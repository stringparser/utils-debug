'use strict';

var path = require('path');

it('resolves filepaths from CWD', function(){
  process.chdir('./test');
  process.env.DEBUG = 'folder/file.js';
  var util = process.reset('../lib/util');
  process.chdir(path.dirname(process.cwd()));
  util.debug.path.should.have.property(
    path.resolve('test', 'folder', 'file.js')
  );
});

it('files should not need extension', function(){
  process.env.DEBUG = 'folder/file';
  var util = process.reset('./lib/util');
  util.debug.path.should.have.property(
    path.resolve('folder', 'file.js'),
    true
  );
});

it('files should be separated by comma', function(){
  process.env.DEBUG = 'folder/file1.js,folder/file2.js';
  var util = process.reset('./lib/util');
  process.env.DEBUG.split(/[, ]+/).forEach(function(filepath){
    util.debug.path.should.have.property(
      path.resolve(filepath),
      true
    );
  });
});

it('DEBUG=* makes util.debug.star = true', function(){
  process.env.DEBUG = '*';
  var util = process.reset('./lib/util');
  util.debug.star.should.be.eql(true);
});

it('DEBUG=folder/ or would be treated as file', function(){
  process.env.DEBUG = 'folder/';
  var util = process.reset('./lib/util');
  util.debug.path.should.have.property(
    path.resolve('folder'),
    true
  );
});

it('DEBUG=folder/* does not qualify as *', function(){
  process.env.DEBUG = 'folder/*';
  var util = process.reset('./lib/util');
  util.debug.path.should.have.property(
    path.resolve('folder'),
    true
  );
  (util.debug.star === void 0).should.be.eql(true);
});

it('DEBUG=folder/*#method is labeled as fn flag', function(){
  process.env.DEBUG = 'folder/*#method';
  var util = process.reset('./lib/util');
  util.debug.path.should.have.property(
    path.resolve('folder'),
    true
  );
  util.debug.fn.should.have.property(
    'method', true
  );
});

it('DEBU=folder/*#method1#method2 to filter more than one', function(){
  process.env.DEBUG = 'folder/*#method1#method2';
  var util = process.reset('./lib/util');
  util.debug.path.should.have.property(
    path.resolve('folder'),
    true
  );
  util.debug.fn.should.have.properties({
    method1: true,
    method2: true
  });
});
