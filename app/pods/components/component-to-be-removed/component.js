import Ember from 'ember';
import T from 'prop-types';

export default Ember.Component.extend({
  propTypes: {
    willBeRemoved: T.bool.isRequired
  }
});
