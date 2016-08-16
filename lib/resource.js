'use strict';

var Aggregator = require('./aggregator');

module.exports = function Resource(name) {
	var _this = this;

	// public
	_this.getName = _getName;
	_this.emit = _emit;
	_this.request = _request;
	_this.add = _add;

	// private
	var _options = {
        name: name || 'WebResource',
        resources: new Store(),
        ajax: {
        	url: '',
	        type: 'GET',
	        data: {},
	        dataType: 'JSON'
        }
    };

    function _getName() {
    	return _options.name;
    }

    function _request(ajaxOption) {
    	return $.ajax($.extend(_options.ajax, ajaxOption));
    }

    function _emit(name, ajaxOption) {

    	return _options.resources.get(name).getHandler()(_this, ajaxOption || {});
    }

    function _add(fn, customAggregator) {
    	var wra =  new (customAggregator || Aggregator)();

    	fn(wra);

    	wra.dumpTo(_options.resources);

    	return _this;
    }

};
