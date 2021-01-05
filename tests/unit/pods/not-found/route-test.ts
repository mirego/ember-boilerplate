// Vendor
import Service from '@ember/service';
import {expect} from 'chai';
import {setupTest} from 'ember-mocha';
import {beforeEach, describe, it} from 'mocha';

// Types
import NotFoundRoute from 'ember-boilerplate/pods/not-found/route';

describe('Unit | Routes | not-found', () => {
  setupTest();

  let route: NotFoundRoute;

  beforeEach(function () {
    route = this.owner.lookup('route:not-found');
  });

  describe('beforeModel', () => {
    describe('when executed inside Fastboot', () => {
      beforeEach(function () {
        const FastbootStub = class extends Service {
          isFastBoot = true;
          response = {
            statusCode: 200,
          };
        };

        this.owner.register('service:fastboot', FastbootStub);
      });

      it('should set the response status code to 404', async () => {
        await route.beforeModel();

        expect(route.fastboot.response.statusCode).to.equal(404);
      });
    });

    describe('when executed inside the browser', () => {
      beforeEach(function () {
        const FastbootStub = class extends Service {
          isFastBoot = false;
        };

        this.owner.register('service:fastboot', FastbootStub);
      });

      it('should do nothing', async () => {
        const result = await route.beforeModel();

        expect(result).to.be.undefined;
      });
    });
  });
});
