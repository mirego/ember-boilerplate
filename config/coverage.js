'use strict';

module.exports = {
  reporters: ['html'],
  excludes: [
    '*.d.ts',
    '*/app.js',
    '*/formats.js',
    '*/resolver.js',
    '*/router.ts',
    '*/server.js',
    '*/graphql/**/*',
    '*/types/**/*',
    '*/initializers/**/*',
    '*/services/-apollo.ts',
    '*/services/service-worker.ts',
  ],
};
