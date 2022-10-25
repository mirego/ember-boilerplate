'use strict';

// NOTE: This is where all runtime environment variables (`EMBER_APP_*`) are read from `process.env`, nowhere else.
const variables = Object.keys(process.env)
  .filter(key => key.startsWith('EMBER_APP_'))
  .reduce((acc, key) => {
    acc[key.replace(/^EMBER_APP_/, '')] = process.env[key];
    return acc;
  }, {});

// NOTE: This is the HTML injected into `dist/index.html` to make the runtime environment available to the browser.
const html = `<!-- RUNTIME_ENVIRONMENT --><script data-fastboot-ignore="">window.RUNTIME_ENVIRONMENT = ${JSON.stringify(
  variables
)}</script><!-- \/RUNTIME_ENVIRONMENT -->`;

// NOTE: This is the pattern to look for when injecting the HTML above.
const htmlPattern = /<!-- RUNTIME_ENVIRONMENT -->[\s\S]+<!-- \/RUNTIME_ENVIRONMENT -->/m;

// NOTE: This is the function that FastBoot calls to inject custom global variables (`process.env` is empty withing Ember.js’s code).
const fastBootBuildSandboxGlobals = defaultGlobals =>
  Object.assign({}, defaultGlobals, {RUNTIME_ENVIRONMENT: variables});

module.exports = {html, htmlPattern, fastBootBuildSandboxGlobals};
