// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';
import sinon from 'sinon';
import Service from '@ember/service';

describe('Unit | Routes | application', () => {
  setupTest();

  let route;

  beforeEach(function() {
    const ApolloShoeboxWriterStub = class extends Service {
      write = sinon.stub();
    };

    this.owner.register(
      'service:apollo/shoebox-writer',
      ApolloShoeboxWriterStub
    );

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

      expect(route.intl.setLocale).to.have.been.calledOnce;
      expect(route.intl.setLocale).to.have.been.calledWith('en-ca');
    });
  });

  describe('didTransition', () => {
    it('should write the apollo cache to the shoebox', () => {
      route.actions.didTransition.call(route);

      expect(route.apolloShoeboxWriter.write).to.have.been.calledOnce;
    });
  });
});
