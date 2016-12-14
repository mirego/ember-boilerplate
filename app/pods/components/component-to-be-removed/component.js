import Ember from 'ember';
import {PropTypes as T} from 'ember-prop-types';

export default Ember.Component.extend({
  propTypes: {
    willBeRemoved: T.bool.isRequired
  }
});
