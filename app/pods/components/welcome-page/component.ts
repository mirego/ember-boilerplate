// Vendor
import Component from '@glimmer/component';

import runtime from 'ember-boilerplate/utils/runtime-environment';

export default class WelcomePage extends Component {
  get helloWorld() {
    // NOTE: This will fetch the `EMBER_APP_HELLO_WORLD` runtime environment variable (either from the client-side or server-side context)
    return runtime('HELLO_WORLD');
  }
}
