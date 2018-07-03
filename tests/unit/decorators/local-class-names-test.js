// Vendor
import {describe, it} from 'mocha';
import chai from 'chai';

// Decorators
import {localClassNames} from 'ember-boilerplate/decorators/local-class-names';

// Constants
const {expect} = chai;

describe('Unit | Decorators | local-class-names', () => {
  describe('when provided with 1 param', () => {
    it('should add the class name passed to the class’ prototype field `localClassNames` array', () => {
      @localClassNames('fake-component')
      class FakeComponent {}

      expect(FakeComponent.prototype.localClassNames).to.deep.equal([
        'fake-component'
      ]);
    });
  });

  describe('when provided with 2 or more params', () => {
    it('should add the class names passed to the class’ prototype field `localClassNames` array', () => {
      @localClassNames('fake-component', 'very-fake-component')
      class VeryFakeComponent {}

      expect(VeryFakeComponent.prototype.localClassNames).to.deep.equal([
        'fake-component',
        'very-fake-component'
      ]);
    });
  });
});
