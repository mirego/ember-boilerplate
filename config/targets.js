'use strict';

const browsers = require('./supported-browsers');

module.exports = {
  browsers: [...browsers.legacy, ...browsers.evergreen]
};
