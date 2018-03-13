// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';

describe('Unit | Services | Session | fetcher', () => {
  setupTest('service:session/fetcher');

  let service;

  beforeEach(function() {
    service = this.subject();
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
      const returnValue = await service.fetch();

      expect(returnValue).to.be.an.instanceOf(Error);
      expect(returnValue.message).to.equal('[session/fetcher] fetch not implemented.');
    });
  });
});
