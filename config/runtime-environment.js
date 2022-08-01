'use strict';

const VARIABLES = {
  HELLO_WORLD: process.env.HELLO_WORLD,
};

module.exports = {
  variables: VARIABLES,
  json() {
    return JSON.stringify(VARIABLES);
  },
};
