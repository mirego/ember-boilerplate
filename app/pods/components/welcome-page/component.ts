// Vendor
import Component from '@glimmer/component';

import runtime from 'ember-boilerplate/utils/runtime-environment';

export default class WelcomePage extends Component {
  get helloWorld() {
    return runtime('HELLO_WORLD');
  }
}
