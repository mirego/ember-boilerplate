// Vendor
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {setupTest} from 'ember-mocha';

describe('Unit | Routes | application', () => {
  setupTest('route:application');

  it('exists', function() {
    const route = this.subject();

    expect(route).to.be.ok;
  });
});
