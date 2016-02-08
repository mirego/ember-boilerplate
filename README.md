# Boilerplate code for Ember.js

## A note about Ember.js version

We [currently lock](https://github.com/mirego/ember-boilerplate/blob/master/bower.json)
Ember’s version to a specific commit in its `canary` release
channel in order to use the new angle-bracket components. This is temporary
until the feature is part of an official release.

## Browser support

| Browser            | OS      | Constraint        |
|--------------------|---------|-------------------|
| …                  | …       | …                 |

## Heroku buildpack

To successfully deploy applications from this boilerplate code on Heroku, you must use a custom buildpack:

```shell
$ heroku config:set BUILDPACK_URL=https://github.com/tonycoco/heroku-buildpack-ember-cli.git
```

## Environment variables

Before running the project, you need to have the following variables defined in a `.env` file:

```
API_HOST
API_NAMESPACE
```

## Managing dependencies

We use ember-cli which depends on node.js, npm and Bower.

```shell
$ brew install node
$ npm install
$ bower install
```

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development browser extensions
  * [Ember inspector for Chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [Ember inspector for Firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

