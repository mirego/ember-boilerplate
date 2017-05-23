# Boilerplate code for Ember.js

## Browser support

| Browser            | OS      | Constraint        |
|--------------------|---------|-------------------|
| …                  | …       | …                 |

## Heroku buildpack

To successfully deploy applications from this boilerplate code on Heroku, you must use the ember-cli custom buildpack: https://github.com/heroku/heroku-buildpack-ember-cli .  Follow the documentation to ensure you install all required packs.

## eslint

All projects using the `ember-boilerplate` must include the latest `eslint`, `stylelint` and `svgo` configurations. You will need the following files:

* [.eslintignore](https://github.com/mirego/mirego-guidelines/blob/master/http/configs/.eslintignore)
* [.eslintrc](https://github.com/mirego/mirego-guidelines/blob/master/http/configs/.eslintrc)
* [.stylelintrc](https://github.com/mirego/mirego-guidelines/blob/master/http/configs/.stylelintrc)
* [.svgo.yml](https://github.com/mirego/mirego-guidelines/blob/master/http/configs/.svgo.yml)

After you have copied these two files, open `.travis.yml` and remove the comment for the lines below `script` (line 17):

```yaml
# Before
script:
  # - yarn run lint
  # - yarn test

# After
script:
  - yarn run lint
  - yarn test
```

## Stylelint

All project using the `ember-boilerplate` must include the latest `.stylelintrc` file. You can access it [here](https://github.com/mirego/mirego-guidelines/blob/master/http/configs/.stylelintrc).

## Managing dependencies

We use ember-cli which depends on node.js, yarn.

```shell
$ brew install node
$ yarn install
```

Everytime a new package is added or an update is made in `package.json` file, you **must** update the `yarn.lock` file by running `yarn install`.

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).
