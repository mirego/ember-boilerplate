# Boilerplate code for Ember.js

## Browser support

| Browser            | OS      | Constraint        |
|--------------------|---------|-------------------|
| …                  | …       | …                 |

## Heroku buildpack

To successfully deploy applications from this boilerplate code on Heroku, you must use the ember-cli custom buildpack: https://github.com/heroku/heroku-buildpack-ember-cli .  Follow the documentation to ensure you install all required packs. 

## eslint

All projects using the `ember-boilerplate` must include the latest `eslint` configuration. You will need the following files:

* [.eslintignore](https://github.com/mirego/mirego-guidelines/blob/master/http/configs/.eslintignore)
* [.eslintrc](https://github.com/mirego/mirego-guidelines/blob/master/http/configs/.eslintrc)

After you have copied these two files, open `.travis.yml` and remove the comment for the lines below `script` (line 17):

```yaml
# Before
script:
  # - npm run lint
  # - npm test

# After
script:
  - npm run lint
  - npm test
```

## Stylelint
 
All project using the `ember-boilerplate` must include the latest `.stylelintrc` file. You can access it [here](https://github.com/mirego/mirego-guidelines/blob/master/http/configs/.stylelintrc).

## Managing dependencies

We use ember-cli which depends on node.js, npm and Bower.

```shell
$ brew install node
$ npm install
$ bower install
```

### Updating dependencies

To make sure we always have frozen dependencies which we have tested and know to work together, we use the [npm shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) command. What that means is that every time you update a dependency, you must run the `npm shrinkwrap` command to make sure to update the `npm-shrinkwrap.json` file so that when your coworkers install the dependencies, they get *exactly* the same ones as you.

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

