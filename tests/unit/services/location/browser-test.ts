// Vendor
import {expect} from 'chai';
import {setupTest} from 'ember-mocha';
import {afterEach, beforeEach, describe, it} from 'mocha';
import window, {reset as windowMockReset} from 'ember-window-mock';

// Types
import Location from 'ember-boilerplate/services/location';

describe('Unit | Services | Location | browser', function() {
  setupTest();

  let service: Location;

  beforeEach(function() {
    service = this.owner.lookup('service:location/browser');
  });

  afterEach(function() {
    windowMockReset();
  });

  it('`protocol` should return `window.location.protocol`', function() {
    window.location.protocol = 'https:';

    expect(service.protocol).to.equal('https:');
  });

  it('`host` should return `window.location.host`', function() {
    window.location.hostname = 'www.mirego.com';
    window.location.port = '';

    expect(service.host).to.equal('www.mirego.com');
  });

  it('`path` should return `window.location.path`', function() {
    window.location.pathname = '/foo-bar';

    expect(service.path).to.equal('/foo-bar');
  });

  it('`hash` should return `window.location.hash`', function() {
    window.location.hash = '#foo';

    expect(service.hash).to.equal('#foo');
  });

  it('`queryString` should return `window.location.queryString`', function() {
    window.location.search = '?foo=bar';

    expect(service.queryString).to.equal('?foo=bar');
  });
});
