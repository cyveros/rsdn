'use strict';

const Store = require('./store');
const Aggregator = require('./aggregator');

module.exports = function Dispatcher(name) {
	var _this = this;
	// public
	_this.name = name || 'dispatcher';

	_this.getName = _getName;
	_this.add = _add;
	_this.dispatch = _dispatch;

	// private
	_this.store = new Store('_dispatcher.store');

	function _getName() {
		return _this.name;
	}

	function _add(target, customAggregator) {
		var da = new (customAggregator || Aggregator)();

		target(da);

		da.dumpTo(_this.store);

		return _this;
	}

	function _dispatch(target, payload) {
		if (!_this.store.has(target)) {
			throw new Error('Unable to find module "' + target + '", please verify the spelling or make sure the module were available.');
			return;
		}

		var dispatchTarget = _this.store.get(target);

		if (dispatchTarget.getPreHandler().apply(_this, [dispatchTarget.getData()])) {
			dispatchTarget.getData().set(payload);
			dispatchTarget.getHandler().apply(_this, [dispatchTarget.getData()]);
		}
	}
};
