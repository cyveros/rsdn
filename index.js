'use strict';

var Namespace = require('./lib/namespace'),
	Store = require('./lib/store');

module.exports = function() {
	return {
		namespace: Namespace,
		store: Store
	};
};