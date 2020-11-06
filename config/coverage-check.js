'use strict';

module.exports = {
  thresholds: {
    branches: 75,
    functions: 75,
    lines: 75,
    statements: 75,
  },
  watermarks: {
    branches: [70, 80],
    functions: [70, 80],
    lines: [70, 80],
    statements: [70, 80],
  },
};
