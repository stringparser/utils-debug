'use strict';

exports = module.exports = {};

exports.inspect = require('util').inspect;
exports.callsites = require('v8-callsites');
exports.prettyTime = require('pretty-hrtime');

// assorted
//
exports.map = [].map;
