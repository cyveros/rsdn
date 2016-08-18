"use strict";
var Store = (function () {
    function Store(name) {
        this.length = 0;
        this.name = name || 'store';
        this.items = {};
        this.lastAddedKey = null;
    }
    Store.prototype.get = function (target) {
        if (!this.has(target)) {
            return false;
        }
        return this.items[target];
    };
    Store.prototype.getAll = function () {
        return this.items;
    };
    Store.prototype.getLastIn = function () {
        return this.get(this.lastAddedKey);
    };
    Store.prototype.has = function (target) {
        return this.items.hasOwnProperty(target);
    };
    Store.prototype.set = function (target, value, filter) {
        if (!this.has(target)) {
            this.length += 1;
        }
        this.items[target] = filter === undefined ? value : filter(value);
        this.lastAddedKey = target;
        return this;
    };
    Store.prototype.push = function (value) {
        return this.set(this.uuid(), value);
    };
    Store.prototype.remove = function (target) {
        if (this.has(target)) {
            delete this.items[target];
        }
        return this;
    };
    Store.prototype.keys = function () {
        var keys = [];
        for (var k in this.items) {
            if (this.has(k)) {
                keys.push(k);
            }
        }
        return keys;
    };
    Store.prototype.values = function () {
        var values = [];
        for (var k in this.items) {
            if (this.has(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    };
    Store.prototype.each = function (fn) {
        for (var k in this.items) {
            if (this.has(k)) {
                fn(this.items[k], k);
            }
        }
        return this;
    };
    Store.prototype.clear = function () {
        this.items = {};
        this.length = 0;
        return this;
    };
    Store.prototype.getName = function () {
        return this.name;
    };
    Store.prototype.uuid = function () {
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
    return Store;
}());
exports.__esModule = true;
exports["default"] = Store;
