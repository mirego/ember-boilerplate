// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';
import sinon from 'sinon';

describe('Unit | Routes | application', () => {
  setupTest();

  let route;

  beforeEach(function() {
    // We need to do this because ember-intl somehow always
    // overwrites our `this.owner.register` when trying to stub it.
    const intl = this.owner.lookup('service:intl');
    intl.setLocale = sinon.stub();

    route = this.owner.lookup('route:application');
  });

  it('should exist', () => {
    expect(route).to.be.ok;
  });

  describe('beforeModel', () => {
    it('should set the locale of the app', async () => {
      await route.beforeModel();

      expect(route.get('intl').setLocale).to.have.been.calledOnce;
      expect(route.get('intl').setLocale).to.have.been.calledWith('en-ca');
    });
  });
});
