import Ember from 'ember';

export default Ember.GlimmerComponent.extend({
  attributeBindings: ['disabled', 'type'],

  disabled: Ember.computed.readOnly('loading'),
  loading: false,

  click() {
    this.attrs['on-click']();
  }
});
