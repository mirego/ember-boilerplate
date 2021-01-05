// Vendor
import Service from '@ember/service';
import {expect} from 'chai';
import {setupTest} from 'ember-mocha';
import {afterEach, beforeEach, describe, it} from 'mocha';
import window from 'ember-window-mock';
import {setupWindowMock, reset as windowMockReset} from 'ember-window-mock/test-support';

// Types
import Location from 'ember-boilerplate/services/location';

describe('Unit | Services | Location', function () {
  setupTest();
  setupWindowMock(this);

  let service: Location;

  beforeEach(function () {
    service = this.owner.lookup('service:location');
  });

  afterEach(() => {
    windowMockReset();
  });

  describe('locationService', () => {
    describe('when executing inside FastBoot', () => {
      beforeEach(function () {
        class FastBootStub extends Service {
          isFastBoot = true;
        }

        this.owner.register('service:fastboot', FastBootStub);
      });

      it('should return a FastBootLocation service', () => {
        expect(service.locationService).to.equal(service.fastbootLocation);
      });
    });

    describe('when executing inside the browser', () => {
      beforeEach(function () {
        class FastBootStub extends Service {
          isFastBoot = false;
        }

        this.owner.register('service:fastboot', FastBootStub);
      });

      it('should return a BrowserLocation service', () => {
        expect(service.locationService).to.equal(service.browserLocation);
      });
    });
  });

  describe('fullURL', () => {
    beforeEach(function () {
      class BrowserLocationStub extends Service {
        protocol = 'https:';
        host = 'mirego.com';
        path = '/foo-bar';
        queryString = '?baz=quux';
      }

      this.owner.register('service:location/browser', BrowserLocationStub);
    });

    it('should return a URL made of the different parts returned by the locationService', () => {
      expect(service.fullURL).to.equal('https://mirego.com/foo-bar?baz=quux');
    });
  });

  describe('assign', () => {
    it('should set `window.location.href` to the URL provided', () => {
      service.assign('https://mirego.com');

      expect(window.location.href).to.equal('https://mirego.com/');
    });
  });
});
