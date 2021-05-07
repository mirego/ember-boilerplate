<div align="center">
  <img src="https://user-images.githubusercontent.com/11348/51911477-f2b17880-239f-11e9-89aa-8cf94e957155.png" width="600" />
  <p><br />This repository is the stable base upon which we build our Ember.js projects at Mirego.<br />We want to share it with the world so you can build awesome Ember.js applications too.</p>
  <a href="https://github.com/mirego/ember-boilerplate/actions/workflows/ci.yaml"><img src="https://github.com/mirego/ember-boilerplate/actions/workflows/ci.yaml/badge.svg" /></a>
</div>

## Introduction

To learn more about _why_ we created and maintain this boilerplate project, read our [blog post](https://shift.mirego.com/en/boilerplate-projects).

## Content

This boilerplate comes with batteries included, you’ll find:

- Ember Octane: Glimmer Components, modifiers, etc.
- A battle-tested production-ready [FastBoot](https://ember-fastboot.com) server
- Tests with [mocha](https://mochajs.org), with coverage
- Linting with [eslint](https://eslint.org), [stylelint](https://stylelint.io) and [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint)
- Formatting with [Prettier](https://prettier.io)
- A [GraphQL](https://graphql.org) setup powered by [Apollo](https://www.apollographql.com)
- Translations powered by [ember-intl](https://github.com/ember-intl/ember-intl)
- [TypeScript](https://www.typescriptlang.org)
- [CSS modules](https://github.com/salsify/ember-css-modules) with [Sass/SCSS](https://sass-lang.com)
- A clean and useful `README.md` template (in both [english](./BOILERPLATE_README.md) and [french](./BOILERPLATE_README.fr.md))

## Usage

### With GitHub template

1. Click on the [**Use this template**](https://github.com/mirego/ember-boilerplate/generate) button to create a new repository
2. Clone your newly created project (`git clone https://github.com/you/repo.git`)
3. Run the boilerplate setup script (`./boilerplate-setup.sh your-project-name`)
4. Commit the changes (`git commit -a -m "Rename ember-boilerplate parts"`)

### Without GitHub template

1. Clone this project (`git clone https://github.com/mirego/ember-boilerplate.git`)
2. Delete the internal Git directory (`rm -rf .git`)
3. Run the boilerplate setup script (`./boilerplate-setup.sh your-project-name`)
4. Create a new Git repository (`git init`)
5. Create the initial Git commit (`git commit -a -m "Initial commit"`)

## Preferred libraries

Some batteries aren’t included since all projects have their own needs and requirements. Here’s a list of our preferred libraries to help you get started:

| Category                     | Libraries                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------- |
| Animations                   | [`ember-animated`](https://www.npmjs.com/package/ember-animated)                 |
| Click outside event          | [`ember-click-outside`](https://www.npmjs.com/package/ember-click-outside)       |
| Custom calendar              | [`ember-power-calendar`](https://www.npmjs.com/package/ember-power-calendar)     |
| Custom datepicker            | [`ember-power-datepicker`](https://www.npmjs.com/package/ember-power-datepicker) |
| Custom select                | [`ember-power-select`](https://www.npmjs.com/package/ember-power-select)         |
| File upload                  | [`ember-file-upload`](https://www.npmjs.com/package/ember-file-upload)           |
| Flash messages               | [`ember-cli-flash`](https://www.npmjs.com/package/ember-cli-flash)               |
| Isomorphic cookie management | [`ember-cookies`](https://www.npmjs.com/package/ember-cookies)                   |
| Isomorphic locale detection  | [`ember-best-language`](https://www.npmjs.com/package/ember-best-language)       |
| List sorting                 | [`ember-sortable`](https://www.npmjs.com/package/ember-sortable)                 |
| Modal dialog                 | [`ember-modal-dialog`](https://www.npmjs.com/package/ember-modal-dialog)         |
| Permissions management       | [`ember-can`](https://www.npmjs.com/package/ember-can)                           |
| Sticky element               | [`ember-sticky-element`](https://www.npmjs.com/package/ember-sticky-element)     |
| CSS transitions              | [`ember-css-transitions`](https://www.npmjs.com/package/ember-css-transitions)   |

## License

Ember Boilerplate is © 2015-2020 [Mirego](https://www.mirego.com) and may be freely distributed under the [New BSD license](http://opensource.org/licenses/BSD-3-Clause). See the [`LICENSE.md`](https://github.com/mirego/ember-boilerplate/blob/master/LICENSE.md) file.

The glasses logo is based on [this lovely icon by Daniela Baptista](https://thenounproject.com/term/glasses/789701), from The Noun Project. Used under a [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/) license.

## About Mirego

[Mirego](https://www.mirego.com) is a team of passionate people who believe that work is a place where you can innovate and have fun. We’re a team of [talented people](https://life.mirego.com) who imagine and build beautiful Web and mobile applications. We come together to share ideas and [change the world](http://www.mirego.org).

We also [love open-source software](https://open.mirego.com) and we try to give back to the community as much as we can.
