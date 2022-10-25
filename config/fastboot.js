'use strict';

// Utils
const runtimeEnvironment = require('./runtime-environment');

module.exports = function (environment) {
  return {
    buildSandboxGlobals: runtimeEnvironment.fastBootBuildSandboxGlobals,
  };
};
