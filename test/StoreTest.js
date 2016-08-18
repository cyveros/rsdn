"use strict";
var store_1 = require('./../src/store');
var chai_1 = require('chai');
describe('#rsdn', function () {
    it('initialize namespace', function () {
        var store = new store_1["default"]();
        chai_1.expect(store).to.be.instanceof(store_1["default"]);
    });
});
