'use strict';

module.exports = function Store(name) {
    var _this = this;

    // public
    _this.length = 0;

    _this.set = _set;
    _this.has = _has;
    _this.push = _push;
    _this.get = _get;
    _this.getAll = _getAll;
    _this.getRecent = _getRecent;
    _this.remove = _remove;
    _this.getName = _getName;
    _this.keys = _keys;
    _this.values = _values;
    _this.each = _each;
    _this.clear = _clear;


    // private
    var _items = {};
    var _name = name || 'store';
    var _lastAddedKey = false;

    function _getName() {
        return _name;
    }

    function _set(target, value, filter) {
        if (typeof(target) === 'object') {
            _items = $.extend(_items, target);
            _this.length++;

            return _this;
        }

        _items[target] = filter === undefined ? value : filter(value);

        _lastAddedKey = target;

        return _this;
    }

    function _push(value) {
        var id = _uuid();
        _set(id, value);
        _this.length++;

        return id;
    }

    function _has(key) {
        return _items.hasOwnProperty(key);
    }

    function _get(key) {
        return _has(key) ? _items[key] : null;
    }

    function _getRecent() {
        if (_lastAddedKey) {
            return _get(_lastAddedKey);
        }

        return false;
    }

    function _getAll() {
        return _items;
    }

    function _remove(key) {
        if (_has(key)) {
            delete _items[key];
            _this.length--;
        }

        return _this;
    }

    function _keys() {
        var keys = [];
        for (var k in _items) {
            if (_has(k)) {
                keys.push(k);
            }
        }
        
        return keys;
    }

    function _values() {
        var values = [];
        for (var k in _items) {
            if (_has(k)) {
                values.push(_items[k]);
            }
        }
        
        return values;
    }

    function _each(fn) {
        for (var k in _items) {
            if (_has(k)) {
                fn(_items[k], k);
            }
        }

        return _this;
    }

    function _clear() {
        _items = {}
        _this.length = 0;

        return _this;
    }

    function _uuid() {
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        return s.join("");
    };
};
