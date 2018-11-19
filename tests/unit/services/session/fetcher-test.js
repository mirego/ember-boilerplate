// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';

describe('Unit | Services | Session | fetcher', () => {
  setupTest();

  let service;

  beforeEach(function() {
    service = this.owner.lookup('service:session/fetcher');
  });

  it('should exist', () => {
    expect(service).to.be.ok;
  });

  describe('fetch', () => {
    it('should exist as an async method', () => {
      expect(service).to.respondTo('fetch');
      expect(service.fetch()).to.be.an.instanceOf(Promise);
    });

    it('should return an error because it has no implementation', async () => {
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
