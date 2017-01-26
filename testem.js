/* eslint-env node */
/* eslint-disable camelcase */

module.exports = {
  framework: 'mocha',
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: [
    'PhantomJS'
  ],
  launch_in_dev: [
    'PhantomJS',
    'Chrome',
    'Firefox'
  ]
};