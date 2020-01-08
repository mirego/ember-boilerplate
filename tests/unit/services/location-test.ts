// Vendor
import Service from '@ember/service';
import {expect} from 'chai';
import {setupTest} from 'ember-mocha';
import {afterEach, beforeEach, describe, it} from 'mocha';
import window, {reset as windowMockReset} from 'ember-window-mock';

// Types
import Location from 'ember-boilerplate/services/location';

describe('Unit | Services | shoebox', function() {
  setupTest();

  let service: Location;

  beforeEach(function() {
    service = this.owner.lookup('service:location');
  });

  afterEach(function() {
    windowMockReset();
  });

  describe('locationService', function() {
    describe('when executing inside FastBoot', function() {
      beforeEach(function() {
        class FastBootStub extends Service {
          isFastBoot = true;
        }

        this.owner.register('service:fastboot', FastBootStub);
      });

      it('should return a FastBootLocation service', function() {
        expect(service.locationService).to.equal(service.fastbootLocation);
      });
    });

    describe('when executing inside the browser', function() {
      beforeEach(function() {
        class FastBootStub extends Service {
          isFastBoot = false;
        }

        this.owner.register('service:fastboot', FastBootStub);
      });

      it('should return a BrowserLocation service', function() {
        expect(service.locationService).to.equal(service.browserLocation);
      });
    });
  });

  describe('fullURL', function() {
    beforeEach(function() {
      class BrowserLocationStub extends Service {
        protocol = 'https:';
        host = 'mirego.com';
        path = '/foo-bar';
        queryString = '?baz=quux';
      }

      this.owner.register('service:location/browser', BrowserLocationStub);
    });

    it('should return a URL made of the different parts returned by the locationService', function() {
      expect(service.fullURL).to.equal('https://mirego.com/foo-bar?baz=quux');
    });
  });

  describe('assign', function() {
    it('should set `window.location.href` to the URL provided', function() {
      service.assign('https://mirego.com');

      expect(window.location.href).to.equal('https://mirego.com/');
    });
  });
});
