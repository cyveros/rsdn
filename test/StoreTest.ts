
import Store from './../src/store';
import { expect } from 'chai';

describe('#rsdn', () => {
	it('initialize namespace', () => {
		var store = new Store();

		expect(store).to.be.instanceof(Store);
	});
});