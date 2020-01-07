# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

Since it is a boilerplate project, there are technically no official (versioned) _releases_. Therefore, the `master` branch should always be stable and usable.

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
