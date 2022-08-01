'use strict';

// Utils
const runtimeEnvironment = require('./runtime-environment');

module.exports = function (environment) {
  return {
    buildSandboxGlobals(defaultGlobals) {
      return Object.assign({}, defaultGlobals, {RUNTIME_ENVIRONMENT_VARIABLES: runtimeEnvironment.variables});
    },
  };
};
