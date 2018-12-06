// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';
import sinon from 'sinon';
import Service from '@ember/service';
import {computed} from '@ember-decorators/object';

describe('Unit | Services | Apollo | shoebox-reader', () => {
  setupTest();

  let service;

  describe('when executing inside FastBoot', () => {
    const FastBootStub = class extends Service {
      isFastBoot = true;
    };

    beforeEach(function() {
      this.owner.register('service:fastboot', FastBootStub);

      service = this.owner.lookup('service:apollo/shoebox-reader');
    });

    describe('read', () => {
      it('should return `null` because we don’t want to restore anything when we’re server-side rendering', () => {
        expect(service.read()).to.equal(null);
      });
    });
  });

  describe('when executing inside the browser', () => {
    describe('with content in the shoebox', () => {
      const FastBootStub = class extends Service {
        isFastBoot = false;

        @computed
        get shoebox() {
          return {
            retrieve: sinon.stub().returns('{"foo": "bar"}')
          };
        }
      };

      beforeEach(function() {
        this.owner.register('service:fastboot', FastBootStub);

        service = this.owner.lookup('service:apollo/shoebox-reader');
      });

      describe('read', () => {
        it('should return the object stored in the shoebox, parsed as a JavaScript object', () => {
          expect(service.read()).to.deep.equal({foo: 'bar'});
        });
      });
    });

    describe('with no content in the shoebox', () => {
      const FastBootStub = class extends Service {
        isFastBoot = false;

        @computed
        get shoebox() {
          return {
            retrieve: sinon.stub().returns(undefined)
          };
        }
      };

      beforeEach(function() {
        this.owner.register('service:fastboot', FastBootStub);

        service = this.owner.lookup('service:apollo/shoebox-reader');
      });

      describe('read', () => {
        it('should return a plain object', () => {
          expect(service.read()).to.deep.equal({});
        });
      });
    });

    describe('with unparseable content in the shoebox', () => {
      const FastBootStub = class extends Service {
        isFastBoot = false;

        @computed
        get shoebox() {
          return {
            retrieve: sinon.stub().returns("{invalid_json: 'bar'}")
          };
        }
      };

      beforeEach(function() {
        this.owner.register('service:fastboot', FastBootStub);

        service = this.owner.lookup('service:apollo/shoebox-reader');
      });

      describe('read', () => {
        it('should return a plain object', () => {
          expect(service.read()).to.deep.equal({});
        });
      });
    });
  });
});
