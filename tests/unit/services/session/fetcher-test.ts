// Vendor
import {expect} from 'chai';
import {setupTest} from 'ember-mocha';
import {beforeEach, describe, it} from 'mocha';

// Types
import SessionFetcher from 'ember-boilerplate/services/session/fetcher';

describe('Unit | Services | Session | fetcher', function() {
  setupTest();

  let service: SessionFetcher;

  beforeEach(function() {
    service = this.owner.lookup('service:session/fetcher');
  });

  describe('fetch', function() {
    it('should exist as an async method', function() {
      expect(service).to.respondTo('fetch');
      expect(service.fetch()).to.be.an.instanceOf(Promise);
    });

    it('should return an error because it has no implementation', async function() {
      try {
        await service.fetch();
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal(
          '[session/fetcher] fetch not implemented.'
        );
      }
    });
  });
});
