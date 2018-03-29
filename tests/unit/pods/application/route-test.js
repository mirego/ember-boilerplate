// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';
import sinon from 'sinon';
import Service from '@ember/service';

describe('Unit | Routes | application', () => {
  setupTest('route:application');

  let route;

  beforeEach(function() {
    const IntlStub = Service.extend({
      setLocale: sinon.stub()
    });

    this.register('service:intl', IntlStub);

    route = this.subject();
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
