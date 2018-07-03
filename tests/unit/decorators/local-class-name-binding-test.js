// Vendor
import {describe, it} from 'mocha';
import chai from 'chai';
import {computed} from '@ember-decorators/object';

// Decorators
import {localClassNameBinding} from 'ember-boilerplate/decorators/local-class-name-binding';

// Constants
const {expect} = chai;

describe('Unit | Decorators | local-class-name-binding', () => {
  describe('when provided with no params', () => {
    it('should add the decorated field to the `localClassNameBindings`', () => {
      const FakeComponent = class {
        @computed
        @localClassNameBinding
        get computedClassName() {
          return 'computed-class-name';
        }
      };

      const fakeComponent = new FakeComponent();

      expect(fakeComponent.localClassNameBindings).to.deep.equal([
        'computedClassName'
      ]);
    });
  });

  describe('when provided with 1 param', () => {
    it('should add the decorated field to the `localClassNameBindings` concatenated with the "truthy" class name', () => {
      const FakeComponent = class {
        @localClassNameBinding('truthy-class') isTruthy = false;
      };

      const fakeComponent = new FakeComponent();

      expect(fakeComponent.localClassNameBindings).to.deep.equal([
        'isTruthy:truthy-class'
      ]);
    });
  });

  describe('when provided with 2 params', () => {
    it('should add the decorated field to the `localClassNameBindings` concatenated with the "truthy" and "falsey" class name', () => {
      const FakeComponent = class {
        @localClassNameBinding('truthy-class', 'falsey-class')
        isTruthy = false;
      };

      const fakeComponent = new FakeComponent();

      expect(fakeComponent.localClassNameBindings).to.deep.equal([
        'isTruthy:truthy-class:falsey-class'
      ]);
    });
  });
});
