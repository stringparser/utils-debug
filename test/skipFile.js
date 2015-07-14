'use strict';

var path = require('path');

it('# to filter functions by name', function(){
  process.env.DEBUG = 'folder/*#fnName';
  var util = process.reset('./lib/util');
  util.debug.path.should.have.property(
    path.resolve('folder'),
    true
  );
  util.debug.fn.should.have.property(
    'fnName', true
  );
});
