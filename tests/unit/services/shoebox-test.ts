// Vendor
import {computed} from '@ember/object';
import Service from '@ember/service';
import {expect} from 'chai';
import {setupTest} from 'ember-mocha';
import {beforeEach, describe, it} from 'mocha';
import sinon from 'sinon';

// Types
import Shoebox from 'ember-boilerplate/services/shoebox';

describe('Unit | Services | shoebox', function() {
  setupTest();

  let service: Shoebox;

  describe('read', function() {
    describe('when executing inside FastBoot', function() {
      beforeEach(function() {
        class FastBootStub extends Service {
          isFastBoot = true;

          get shoebox() {
            return {
              put: sinon.stub().withArgs('foo')
            };
          }
        }

        this.owner.register('service:fastboot', FastBootStub);

        service = this.owner.lookup('service:shoebox');
      });

      it('should return `null` because we can’t restore anything when we’re server-side rendering', function() {
        expect(service.read('foo')).to.equal(null);
      });
    });

    describe('when executing inside the browser', function() {
      describe('with content in the shoebox', function() {
        beforeEach(function() {
          class FastBootStub extends Service {
            isFastBoot = false;

            get shoebox() {
              return {
                retrieve: sinon
                  .stub()
                  .withArgs('foo')
                  .returns('{"foo": "bar"}')
              };
            }
          }

          this.owner.register('service:fastboot', FastBootStub);

          service = this.owner.lookup('service:shoebox');
        });

        describe('read', function() {
          it('should return the object stored in the shoebox, parsed as a JavaScript object', function() {
            expect(service.read('foo')).to.deep.equal({foo: 'bar'});
          });
        });
      });

      describe('with no content in the shoebox', function() {
        class FastBootStub extends Service {
          isFastBoot = false;

          get shoebox() {
            return {
              retrieve: sinon
                .stub()
                .withArgs('foo')
                .returns(undefined)
            };
          }
        }

        beforeEach(function() {
          this.owner.register('service:fastboot', FastBootStub);

          service = this.owner.lookup('service:shoebox');
        });

        describe('read', function() {
          it('should return a plain object', function() {
            expect(service.read('foo')).to.deep.equal({});
          });
        });
      });

      describe('with unparseable content in the shoebox', function() {
        class FastBootStub extends Service {
          isFastBoot = false;

          get shoebox() {
            return {
              retrieve: sinon
                .stub()
                .withArgs('foo')
                .returns("{invalid_json: 'bar'}")
            };
          }
        }

        beforeEach(function() {
          this.owner.register('service:fastboot', FastBootStub);

          service = this.owner.lookup('service:shoebox');
        });

        describe('read', function() {
          it('should return a plain object', function() {
            expect(service.read('foo')).to.deep.equal({});
          });
        });
      });
    });
  });

  describe('write', function() {
    describe('when executing inside the browser', function() {
      beforeEach(function() {
        class FastBootStub extends Service {
          isFastBoot = false;

          @computed()
          get shoebox() {
            return {
              put: sinon.stub()
            };
          }
        }

        this.owner.register('service:fastboot', FastBootStub);

        service = this.owner.lookup('service:shoebox');
      });

      describe('write', function() {
        it('should not call the shoebox because we don’t want to write anything when we’re in the browser', function() {
          service.write('foo', 'bar');

          expect(service.fastboot.shoebox.put).to.not.have.been.called;
        });
      });
    });

    describe('when executing inside FastBoot', function() {
      describe('with no content in the shoebox', function() {
        beforeEach(function() {
          class FastBootStub extends Service {
            isFastBoot = true;

            @computed()
            get shoebox() {
              return {
                put: sinon.stub()
              };
            }
          }

          this.owner.register('service:fastboot', FastBootStub);

          service = this.owner.lookup('service:shoebox');
        });

        describe('write', function() {
          it('should write the object, serialized, inside the shoebox', function() {
            service.write('foo', {foo: 'bar'});

            expect(service.fastboot.shoebox.put).to.have.been.calledOnce;
            expect(service.fastboot.shoebox.put).to.have.been.calledWith(
              'foo',
              '{"foo":"bar"}'
            );
          });
        });
      });
    });
  });
});
