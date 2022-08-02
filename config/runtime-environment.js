'use strict';

const variables = {
  HELLO_WORLD: process.env.HELLO_WORLD,
};

const htmlPattern = /<!-- RUNTIME_ENVIRONMENT -->[\s\S]+<!-- \/RUNTIME_ENVIRONMENT -->/m;

const html = `
  <!-- RUNTIME_ENVIRONMENT -->
  <script data-fastboot-ignore="">window.RUNTIME_ENVIRONMENT = ${JSON.stringify(variables)}</script>
  <!-- \/RUNTIME_ENVIRONMENT -->
`;

const fastBootBuildSandboxGlobals = defaultGlobals =>
  Object.assign({}, defaultGlobals, {RUNTIME_ENVIRONMENT: variables});

module.exports = {
  htmlPattern,
  html,
  fastBootBuildSandboxGlobals,
};
