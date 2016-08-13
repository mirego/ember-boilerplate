import {describe, it, beforeEach, afterEach} from 'mocha';
import {expect} from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: Dummy', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /', function() {
    visit('/');

    andThen(function() {
      expect(currentPath()).to.equal('index');
    });
  });
});
