// Vendor
import {expect} from 'chai';
import {setupTest} from 'ember-mocha';
import {afterEach, beforeEach, describe, it} from 'mocha';
import window from 'ember-window-mock';
import {setupWindowMock, reset as windowMockReset} from 'ember-window-mock/test-support';

// Types
import Location from 'ember-boilerplate/services/location';

describe('Unit | Services | Location | Browser', function () {
  setupTest();
  setupWindowMock(this);

  let service: Location;

  beforeEach(function () {
    service = this.owner.lookup('service:location/browser');
  });

  afterEach(() => {
    windowMockReset();
  });

  it('`protocol` should return `window.location.protocol`', () => {
    window.location.protocol = 'https:';

    expect(service.protocol).to.equal('https:');
  });

  it('`host` should return `window.location.host`', () => {
    window.location.hostname = 'www.mirego.com';
    window.location.port = '';

    expect(service.host).to.equal('www.mirego.com');
  });

  it('`path` should return `window.location.path`', () => {
    window.location.pathname = '/foo-bar';

    expect(service.path).to.equal('/foo-bar');
  });

  it('`hash` should return `window.location.hash`', () => {
    window.location.hash = '#foo';

    expect(service.hash).to.equal('#foo');
  });

  it('`queryString` should return `window.location.queryString`', () => {
    window.location.search = '?foo=bar';

    expect(service.queryString).to.equal('?foo=bar');
  });
});
