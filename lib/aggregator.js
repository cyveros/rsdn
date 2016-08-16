'use strict';

const Store = require('./store');

module.exports = function Aggregator() {
	var _options = {
		name: 'default',
		handler: function(){},
		preHandler: function(){return true;},
		postHanlder: function(){return true},
		data: new Store()
	};

	var _this = this;


	_this.setName = _setName;
	_this.setHandler = _setHandler;
	_this.getHandler = _getHandler;
	_this.setPreHandler = _setPreHandler;
	_this.getPreHandler = _getPreHandler;
	_this.setPostHandler = _setPostHandler;
	_this.getPostHandler = _getPostHandler;
	_this.dumpTo = _dumpTo;
	_this.setData = _setData;
	_this.getData = _getData;

	function _setName(name) {
		_options.name = name;
		return _this;
	}

	function _getName() {
		return _options.name;
	}

	function _setData(data) {
		_options.data.set(data);
		return _this;
	}

	function _getData(target) {
		if (target === undefined) {
			return _options.data;
		}
		return _options.data.get(target);
	}

	function _setHandler(handler) {
		_options.handler = handler;
		return _this;
	}

	function _getHandler() {
		return _options.handler;
	}

	function _setPreHandler(preHandler) {
		_options.preHandler = preHandler;
		return _this;
	}

	function _getPreHandler() {
		return _options.preHandler;
	}

	function _setPostHandler(preHandler) {
		_options.postHandler = postHandler;
		return _this;
	}

	function _getPostHandler() {
		return _options.postHandler;
	}

	function _dumpTo(store) {
		store.set(_getName(), _this);
		return _this;
	}
};