// Vendor
import {expect} from 'chai';
import {setupTest} from 'ember-mocha';
import {beforeEach, describe, it} from 'mocha';

// Types
import Session from 'ember-boilerplate/services/session';

describe('Unit | Services | Session', function () {
  setupTest();

  let service: Session;

  beforeEach(function () {
    service = this.owner.lookup('service:session');
  });

  describe('fetchAccessToken', function () {
    it('should exist as an async method', function () {
      expect(service).to.respondTo('fetchAccessToken');

      expect(service.fetchAccessToken()).to.be.an.instanceOf(Promise);
    });

    it('should return an error because it has no implementation', async function () {
      try {
        await service.fetchAccessToken();
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);

        expect(error.message).to.equal('[session] fetchAccessToken not implemented.');
      }
    });
  });
});
