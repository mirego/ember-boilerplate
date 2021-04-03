// Vendor
import Service from '@ember/service';
import {expect} from 'chai';
import {setupTest} from 'ember-mocha';
import {afterEach, beforeEach, describe, it} from 'mocha';
import sinon from 'sinon';

// Config
import config from 'ember-boilerplate/config/environment';

// Types
import ApplicationRoute from 'ember-boilerplate/pods/application/route';

describe('Unit | Routes | application', () => {
  setupTest();

  let route: ApplicationRoute;
  const originalConfig = config;

  beforeEach(function () {
    const ShoeboxStub = class extends Service {
      read = sinon.stub();
      write = sinon.stub();
    };

    this.owner.register('service:shoebox', ShoeboxStub);

    const TranslationsStub = class extends Service {
      loadForLocale = sinon.stub();
    };

    this.owner.register('service:translations', TranslationsStub);

    // We need to do this because ember-intl somehow always
    // overwrites our `this.owner.register` when trying to stub it.
    const intl = this.owner.lookup('service:intl');
    intl.addTranslations = sinon.stub();
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

    describe('when `config.intl.ASYNC_TRANSLATIONS` is true', () => {
      beforeEach(() => {
        config.intl.ASYNC_TRANSLATIONS = true;
      });

      afterEach(() => {
        config.intl.ASYNC_TRANSLATIONS = originalConfig.intl.ASYNC_TRANSLATIONS;
      });

      it('should load translations asynchronously', async () => {
        await route.beforeModel();

        expect(route.translations.loadForLocale).to.have.been.calledOnce;
        expect(route.translations.loadForLocale).to.have.been.calledWith('en-ca');
      });
    });

    describe('when `config.intl.ASYNC_TRANSLATIONS` is false', () => {
      beforeEach(() => {
        config.intl.ASYNC_TRANSLATIONS = false;
        route.intl.setLocale('en-ca');
      });

      afterEach(() => {
        config.intl.ASYNC_TRANSLATIONS = originalConfig.intl.ASYNC_TRANSLATIONS;
      });

      it('should have translations bundled in the build', async () => {
        await route.beforeModel();

        expect(route.intl.addTranslations).to.not.have.been.called;
      });
    });
  });

  describe('didTransition', () => {
    it('should write the apollo cache to the shoebox', () => {
      route.actions.didTransition.call(route);

      expect(route.shoebox.write).to.have.been.calledOnce;
    });
  });
});
