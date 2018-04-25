// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';
import sinon from 'sinon';
import Service from '@ember/service';
import {computed} from '@ember/object';

describe('Unit | Services | Apollo | shoebox-reader', () => {
  setupTest();

  let service;

  describe('when executing inside FastBoot', () => {
    const FastBootStub = Service.extend({
      isFastBoot: true
    });

    beforeEach(function() {
      this.owner.register('service:fastboot', FastBootStub);

      service = this.owner.lookup('service:apollo/shoebox-reader');
    });

    describe('read', () => {
      it('should return `undefined` because we don’t want to restore anything when we’re server-side rendering', () => {
        expect(service.read()).to.equal(undefined);
      });
    });
  });

  describe('when executing inside the browser', () => {
    describe('with content in the shoebox', () => {
      const FastBootStub = Service.extend({
        isFastBoot: false,
        shoebox: computed(() => ({
          retrieve: sinon.stub().returns('{"foo": "bar"}')
        }))
      });

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
      const FastBootStub = Service.extend({
        isFastBoot: false,
        shoebox: computed(() => ({
          retrieve: sinon.stub().returns(undefined)
        }))
      });

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
      const FastBootStub = Service.extend({
        isFastBoot: false,
        shoebox: computed(() => ({
          retrieve: sinon.stub().returns("{invalid_json: 'bar'}")
        }))
      });

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
