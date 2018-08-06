// Vendor
import {default as window, reset} from 'ember-window-mock';
import {describe, beforeEach, it} from 'mocha';
import {expect} from 'chai';
import {setupTest} from 'ember-mocha';
import Service from '@ember/service';
import EmberObject from '@ember/object';
import {computed} from '@ember-decorators/object';

describe('Unit | Services | AppUrl | builder', () => {
  setupTest();

  let service;

  describe('build', () => {
    describe('when in browser', () => {
      beforeEach(function() {
        reset();

        window.location.protocol = 'http';
        window.location.hostname = 'app.url';
        window.location.port = '80';

        const FastBootStub = class extends Service {
          isFastBoot = false;
        };

        this.owner.register('service:fastboot', FastBootStub);

        service = this.owner.lookup('service:app-url/builder');
      });

      describe('when called without path', () => {
        it('should return canonical root url', () => {
          expect(service.build()).to.equal('http://app.url/');
        });
      });

      describe('when called with path', () => {
        it('should return url with path', () => {
          expect(service.build('/foo/bar')).to.equal('http://app.url/foo/bar');
        });
      });
    });

    describe('when in fastboot', () => {
      beforeEach(function() {
        const request = new EmberObject({
          host: 'app.url'
        });

        const FastBootStub = class extends Service {
          isFastBoot = true;

          @computed
          get request() {
            return request;
          }
        };

        this.owner.register('service:fastboot', FastBootStub);

        service = this.owner.lookup('service:app-url/builder');
      });

      describe('when called without path', () => {
        it('should return canonical root url', () => {
          expect(service.build()).to.equal('http://app.url/');
        });
      });

      describe('when called with path', () => {
        it('should return url with path', () => {
          expect(service.build('/foo/bar')).to.equal('http://app.url/foo/bar');
        });
      });
    });
  });
});
