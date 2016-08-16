'use strict';

var should = require('chai').should;
var expect = require('chai').expect;
var RSDN = require('../index')();
var Namespace = RSDN.namespace;
var Store = RSDN.store;

describe('#rsdn', function(){
	it('initialize namespace', function(){
		var ns = new Namespace();

		expect(ns).to.be.instanceof(Namespace);
		
		expect(ns.getAll()).to.be.instanceof(Store);
		// (ns.debug() instanceof Store).should.equal(true);
	});
});
