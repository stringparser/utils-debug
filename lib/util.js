'use strict';

exports = module.exports = {};

// dependencies
//
exports.inspect = require('util').inspect;
exports.callsites = require('v8-callsites');

// library dependencies
//
exports.debugFlags = require('./debugFlags');

// assorted
//
exports.map = [].map;
