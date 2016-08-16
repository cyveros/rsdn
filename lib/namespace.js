'use strict';

modeule.exports = function namespace(){
	var _this = this;

	// public
	_this.add = _add;
	_this.require = _require;
	_this.debug = _debug;
	_this.store = {};

	// private methods
	function _add(target, fn) {
		if (typeof(target) === 'object') {
			_this.store[target.getName()] = target;

			return _this;
		}

		_this.store[target] = fn;

		return _this;
	}

	function _require(name) {
		if (!_this.store.hasOwnProperty(name)) {
			throw new Error('Unable to find module ' + name);
			return;
		}

		return _this.store[name];
	}

	function _debug() {
		console.log(_this.store);
		return _this.store;
	}
};
