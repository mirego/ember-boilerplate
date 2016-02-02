import Ember from 'ember';

const destroyApp = (application) => {
  Ember.run(application, 'destroy');
};

export default destroyApp;
