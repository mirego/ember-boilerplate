// Vendor
import Component from '@glimmer/component';

import env from 'ember-boilerplate/utils/runtime-environment';

export default class WelcomePage extends Component {
  get helloWorld() {
    return env('HELLO_WORLD');
  }
}
