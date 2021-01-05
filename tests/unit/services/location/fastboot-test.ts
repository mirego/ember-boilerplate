// Vendor
import Service from '@ember/service';
import {expect} from 'chai';
import {setupTest} from 'ember-mocha';
import {afterEach, beforeEach, describe, it} from 'mocha';

// Config
import config from 'ember-boilerplate/config/environment';

// Types
import Location from 'ember-boilerplate/services/location';

describe('Unit | Services | Location | Fastboot', () => {
  setupTest();

  let service: Location;

  beforeEach(function () {
    service = this.owner.lookup('service:location/fastboot');
  });

  describe('protocol', () => {
    beforeEach(function () {
      class FastBootStub extends Service {
        isFastBoot = true;
        request = {
          host: 'www.mirego.com',
          path: '/foo-bar?foo=bar#foo',
        };
      }

      this.owner.register('service:fastboot', FastBootStub);
    });

    afterEach(() => {
      config.environment = 'test';
    });

    it('should return "https:" when the app is running in production', () => {
      config.environment = 'production';

      expect(service.protocol).to.equal('https:');
    });

    it('should return "http:" when the app is running in development', () => {
      config.environment = 'development';

      expect(service.protocol).to.equal('http:');
    });
  });

  describe('host', () => {
    beforeEach(function () {
      class FastBootStub extends Service {
        isFastBoot = true;
        request = {
          host: 'www.mirego.com',
          path: '/foo-bar?foo=bar#foo',
        };
      }

      this.owner.register('service:fastboot', FastBootStub);
    });

    it('`host` should return the request host', () => {
      expect(service.host).to.equal('www.mirego.com');
    });
  });

  describe('path', () => {
    describe('when a path is present', () => {
      beforeEach(function () {
        class FastBootStub extends Service {
          isFastBoot = true;
          request = {
            host: 'www.mirego.com',
            path: '/foo-bar?foo=bar#foo',
          };
        }

        this.owner.register('service:fastboot', FastBootStub);
      });

      it('should return the request path', () => {
        expect(service.path).to.equal('/foo-bar');
      });
    });

    describe('when no path is present', () => {
      beforeEach(function () {
        class FastBootStub extends Service {
          isFastBoot = true;
          request = {
            host: 'www.mirego.com',
            path: '#foo',
          };
        }

        this.owner.register('service:fastboot', FastBootStub);
      });

      it('should return an empty string', () => {
        expect(service.path).to.equal('');
      });
    });
  });

  describe('hash', () => {
    describe('when a hash is present', () => {
      beforeEach(function () {
        class FastBootStub extends Service {
          isFastBoot = true;
          request = {
            host: 'www.mirego.com',
            path: '/foo-bar?foo=bar#foo',
          };
        }

        this.owner.register('service:fastboot', FastBootStub);
      });

      it('should return the request hash', () => {
        expect(service.hash).to.equal('#foo');
      });
    });

    describe('when no hash is present', () => {
      beforeEach(function () {
        class FastBootStub extends Service {
          isFastBoot = true;
          request = {
            host: 'www.mirego.com',
            path: '/foo-bar?foo=bar',
          };
        }

        this.owner.register('service:fastboot', FastBootStub);
      });

      it('should return an empty string', () => {
        expect(service.hash).to.equal('');
      });
    });
  });

  describe('queryString', () => {
    describe('when a queryString is present', () => {
      beforeEach(function () {
        class FastBootStub extends Service {
          isFastBoot = true;
          request = {
            host: 'www.mirego.com',
            path: '/foo-bar?foo=bar#foo',
          };
        }

        this.owner.register('service:fastboot', FastBootStub);
      });

      it('should return the queryString', () => {
        expect(service.queryString).to.equal('?foo=bar');
      });
    });

    describe('when no queryString is present', () => {
      beforeEach(function () {
        class FastBootStub extends Service {
          isFastBoot = true;
          request = {
            host: 'www.mirego.com',
            path: '/foo-bar#foo',
          };
        }

        this.owner.register('service:fastboot', FastBootStub);
      });

      it('should return an empty string', () => {
        expect(service.queryString).to.equal('');
      });
    });
  });
});
