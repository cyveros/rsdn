'use strict';

const Store = require('./store');

module.exports = function Namespace(){
	var _this = this,
		_store = new Store();

	// public
	_this.add = _add;
	_this.require = _require;
	_this.debug = _debug;
	_this.getAll = _getAll;

	// private methods
	function _add(target, fn) {
		if (typeof(target) === 'object') {
			_store.set(target.getName(), target);

			return _this;
		}

		_store.set(target, fn);

		return _this;
	}

	function _require(name) {
		if (!_store.has(name)) {
			throw new Error('Unable to find module ' + name);
			return;
		}

		return _store.get(name);
	}

	function _getAll() {
		return _store;
	}

	function _debug() {
		console.log(_store);
		return _store;
	}
};
