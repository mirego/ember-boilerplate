# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

Since it is a boilerplate project, there are technically no official (versioned) _releases_. Therefore, the `master` branch should always be stable and usable.

# 2021-05-06

### Fixed

- Fix Sentry integration in tests by adding webpack to the dependencies

### Added

- Add GitHub Actions badge in the README

# 2021-04-06

### Changed

- Refactor FastBoot server to remove our custom server class and better use middleware
- Change the build pipeline to use Embroider
- Update the Sentry setup to use the latest version of the addon

### Removed

- Everything related to service workers was removed since it didn’t work anymore with Embroider

# 2021-01-05

### Changed

- Update dependencies and Ember

# 2020-11-27

### Added

- Add .tool-versions file

### Removed

- Custom engine version check script

# 2020-11-25

### Changed

- Change pull request template to explicitely include the Dispatch stack

# 2020-11-09

### Added

- Documentation on preferred libraries
- Add the ember-page-title addon

## 2020-11-06

### Changed

- Update dependencies and Ember

## 2020-08-31

### Added

- Add eslint rule to escape unused variable

## 2020-08-05

### Fixed

- chai-dom is properly setup and ready to use

## 2020-03-18

### Fixed

- Makefile (`Makefile`) output of the different targets when using numbers

## 2020-02-21

### Added

- Add environment variables to better control the ServiceWorker integration:
  - `SERVICE_WORKER_ENABLED`
  - `SERVICE_WORKER_ENABLE_DEBUGGING`
  - `SERVICE_WORKER_ENABLE_PAGE_CACHING`

### Changed

- Completely rewritte the ServiceWorker with [Workbox](https://developers.google.com/web/tools/workbox)
- Replaced the `asset-cache-manifest` in-repo addon with `mirego-service-worker-plugin` which achieves the same thing but also encapsulates all the logic for dealing with a ServiceWorker
- Update ServiceWorker documentation to better reflect the changes mentionned above

## 2020-01-22

### Changed

- Improve Docker-related environment variables in Makefile (#44)

## 2020-01-08

### Changed

- Improve the error page setup: now it only applies to SSR.
  There are better and less buggy ways to handle errors in the browser.

## 2020-01-07

### Added

- Add option to allow/disallow site indexation
- Add error handling in the apollo-client stack

### Changed

- Improve locale lazy loading
- Improve Prettier, eslint and template-lint configurations
- Update `ember-cli-code-coverage` to use the real repository instead of our fork
- Improve code coverage check by replacing `nyc` with own script
- Update typings for a few packages

### Removed

- Remove `<link preload>` since it didn’t play well with SRI

## 2019-12-19

### Changed

Update multiple packages to stay up-to-date.

## 2019-12-18

### Changed

- Update `@glimmer/component` to `1.0.0`
- Update `@glimmer/tracking` to `1.0.0`
- Update `eslint` to `6.7.2`
- Update `eslint-config-prettier` to `6.7.0`
- Update `eslint-plugin-ember` to `7.7.2`. This update adds new rules:
  - `no-actions-hash`
  - `require-tagless-components`
  - `no-classic-classes`
  - `no-classic-components`
  - `no-computed-properties-in-native-classes`
  - `no-test-module-for`
  - `no-get-with-default`
- Update `prettier` to `1.19.1`
- Update `stylelint` to `12.0.0`
- Update `stylelint-config-prettier` to `8.0.0`

## 2019-10-18

### Added

- Project changelog (`CHANGELOG.md`)
