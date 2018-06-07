// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';
import sinon from 'sinon';
import Service from '@ember/service';
import {computed} from '@ember/object';

describe('Unit | Services | Apollo | shoebox-writer', () => {
  setupTest();

  let service;

  describe('when executing inside the browser', () => {
    beforeEach(function() {
      const ApolloStub = Service.extend();

      const FastBootStub = Service.extend({
        isFastBoot: false,
        shoebox: computed(() => ({
          put: sinon.stub()
        }))
      });

      this.owner.register('service:fastboot', FastBootStub);
      this.owner.register('service:apollo', ApolloStub);

      service = this.owner.lookup('service:apollo/shoebox-writer');
    });

    describe('write', () => {
      it('should not call the shoebox because we don’t want to write anything when we’re in the browser', () => {
        service.write();

        expect(service.fastboot.shoebox.put).to.not.have.been.called;
      });
    });
  });

  describe('when executing inside FastBoot', () => {
    describe('with no content in the shoebox', () => {
      beforeEach(function() {
        const ApolloStub = Service.extend({
          cache: computed(() => ({
            extract: sinon.stub().returns({foo: 'bar'})
          }))
        });

        const FastBootStub = Service.extend({
          isFastBoot: true,
          shoebox: computed(() => ({
            put: sinon.stub()
          }))
        });

        this.owner.register('service:fastboot', FastBootStub);
        this.owner.register('service:apollo', ApolloStub);

        service = this.owner.lookup('service:apollo/shoebox-writer');
      });

      describe('write', () => {
        it('should write the object inside the apollo cache, serialized, to the shoebox', () => {
          service.write();

          expect(service.fastboot.shoebox.put).to.have.been.calledOnce;
          expect(service.fastboot.shoebox.put).to.have.been.calledWith(
            'test-apollo-cache',
            '{"foo":"bar"}'
          );
        });
      });
    });
  });
});
