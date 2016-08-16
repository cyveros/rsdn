'use strict';

const Store = require('./store');

module.exports = function Nodelet(name, $) {
	var _this = this;

	// public
	_this.getName = _getName;
	_this.setMapping = _setMapping;
	_this.setIgnored = _setIgnored;
	_this.setTarget = _setTarget;
	_this.setRootNode = _setRootNode;
	_this.setTemplate = _setTemplate;
	_this.getRootNode = _getRootNode;

	_this.valid = _valid;
	_this.add = _add;
	_this.get = _get;
	_this.set = _set;
	_this.render = _render;

	// private
	var _options = {
		mapping: new Store(),
		ignored: [],
		name: name || 'default',
		target: null,
		template: {selector: false, rootNodeSelector: null, jqObj: false},
		rules: new Store(),
		renders: new Store()
	};

	function _getName() {
		return _options.name;
	}

	function _setMapping(mapping) {
		_options.mapping.set(mapping);

		return _this;
	}

	function _setIgnored(ignored) {
		_options.ignored = ignored;

		return _this;
	}

	function _setTarget(target) {
		_options.name = target;

		return _this;
	}

	function _setRootNode(selector) {
		_options.template.rootNodeSelector = selector;

		return _this;
	}

	function _setTemplate(selector) {
		_options.template.selector = selector;

		return _this;
	}

	function _getRootNode() {
		if (_options.template.selector) {
			return _getIsolatedJqObject();
		}

		return $(_options.template.rootNodeSelector);
	}

	function _getIsolatedJqObject() {
		if (_options.template.jqObj) {
			return _options.template.jqObj;
		}

		if (_options.template.selector) {
			_options.template.jqObj = $($(_options.template.selector).html());

			return _options.template.jqObj;
		}

		return false;
	}

	function _valid() {
		var isValid = true;
		var _form = _getRootNode();

		_form.validate();

		_options.mapping.each(function(selector, name){
			if ($.inArray(name, _options.ignored) >= 0) {
				return;
			}

			var $selector = _form.find(selector);

			// no selector is found
			if ($selector.length < 1) {
				return;
			}

			isValid = !! $selector.valid() && isValid;

			if (_options.rules.has(name)) {
				isValid = _options.rules.get(name).getHandler()($selector.val()) && isValid;
			}

			return isValid;
		});

		return isValid;
	}

	function _add(type, fn, customAggregator) {
		var da = new (customAggregator || Aggregator)();

		fn(da);

		da.dumpTo(_options[type]);

		return _this;
	}

	function _get(target, filter) {

		var node = _getRootNode().find(_options.mapping.get(target));
		var value;

		if (node.attr('type') == 'checkbox'){
			value = node.is(':checked');
		} else {
			value = node.val();
		}

		if (filter !== undefined) {
			return filter(value);
		}

		return value;
	}

	function _set(target, value) {
		var $target = _getRootNode().find(_options.mapping.get(target));

		if (typeof(value) !== 'object') {
			_setValue($target, value);

			return _this;
		}

		$.each(value, function(key, val){
			if (key == 'value') {
				_setValue($target, val);
				return;
			}

			if (!val) {
				$target.removeAttr(key);
				return;
			}

			$target.attr(key, val);
		});
		

		return _this;
	}


	function _setValue(jqObj, value) {
		if (jqObj.prop('type') == 'checkbox' || jqObj.prop('type') == 'radio') {
			jqObj.prop('checked', value);

			return;
		}

		jqObj.val(value);
	}

	function _render(name, store) {
		var slicedArgs = Array.prototype.slice.call(arguments, 1);
		_options.renders.get(name).getHandler().apply(_this, slicedArgs);

		return _this;
	}
};
