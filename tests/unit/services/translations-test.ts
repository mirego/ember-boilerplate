// Vendor
import Service from '@ember/service';
import {expect} from 'chai';
import {setupTest} from 'ember-mocha';
import {afterEach, beforeEach, describe, it} from 'mocha';
import sinon from 'sinon';
import Pretender from 'pretender';
import {setupIntl} from 'ember-intl/test-support';

// Types
import Translations from 'ember-boilerplate/services/translations';

interface PretenderWithHandlers extends Pretender {
  handlers: Array<{
    numberOfCalls: number;
  }>;
}

describe('Unit | Services | translations', function() {
  setupTest();
  setupIntl(this, 'en-ca');

  let service: Translations;
  let server: PretenderWithHandlers;

  beforeEach(function() {
    service = this.owner.lookup('service:translations');

    server = new Pretender(function() {
      this.get('/assets/translations/en-ca.json', function() {
        return [200, {'Content-Type': 'application/json'}, '{"foo":"bar"}'];
      });
    }) as PretenderWithHandlers;
  });

  afterEach(function() {
    server.shutdown();
  });

  describe('loadForLocale', function() {
    describe('when executing inside FastBoot', function() {
      beforeEach(function() {
        class FastBootStub extends Service {
          isFastBoot = true;
        }

        this.owner.register('service:fastboot', FastBootStub);

        class ShoeboxStub extends Service {
          read = sinon.stub().returns({foo: 'bar'});
          write = sinon.stub();
        }

        this.owner.register('service:shoebox', ShoeboxStub);
      });

      it('should return the translations and write them to the shoebox', async function() {
        await service.loadForLocale('en-ca');

        expect(server.handlers[0].numberOfCalls).to.equal(1);

        expect(service.shoebox.write).to.have.been.called;

        expect(
          service.shoebox.write
        ).to.have.been.calledWith('translations-en-ca', {foo: 'bar'});

        expect(service.intl.t('foo')).to.equal('bar');
      });
    });

    describe('when executing inside the browser', () => {
      describe('when there are translations in the shoebox', function() {
        beforeEach(function() {
          class FastBootStub extends Service {
            isFastBoot = false;
          }

          this.owner.register('service:fastboot', FastBootStub);

          class ShoeboxStub extends Service {
            read = sinon.stub().returns({foo: 'bar'});
            write = sinon.stub();
          }

          this.owner.register('service:shoebox', ShoeboxStub);
        });

        it('should return the translations from the shoebox', async function() {
          await service.loadForLocale('en-ca');

          expect(server.handlers[0].numberOfCalls).to.equal(0);

          expect(service.shoebox.read).to.have.been.called;

          expect(service.intl.t('foo')).to.equal('bar');
        });
      });

      describe('when there are no translations in the shoebox', function() {
        beforeEach(function() {
          class FastBootStub extends Service {
            isFastBoot = false;
          }

          this.owner.register('service:fastboot', FastBootStub);

          class ShoeboxStub extends Service {
            read = sinon.stub().returns(null);
            write = sinon.stub();
          }

          this.owner.register('service:shoebox', ShoeboxStub);
        });

        it('should return the translations from the network', async function() {
          await service.loadForLocale('en-ca');

          expect(server.handlers[0].numberOfCalls).to.equal(1);

          expect(service.intl.t('foo')).to.equal('bar');
        });
      });
    });
  });
});
