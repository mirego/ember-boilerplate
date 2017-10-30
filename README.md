# Boilerplate code for Ember.js

## Browser support

| Browser            | OS      | Constraint        |
|--------------------|---------|-------------------|
| …                  | …       | …                 |

## Environment variables

```
API_HOST=
GRAPHQL_PATH=
JSON_API_PAT

SENTRY_DSN=
```

## Heroku buildpack

To successfully deploy applications from this boilerplate code on Heroku, you must use Heroku’s [emberjs buildpack](https://github.com/heroku/heroku-buildpack-emberjs) (follow instructions under _Usage_).

## eslint

All projects using the `ember-boilerplate` must include the latest `eslint`, `stylelint` and `svgo` configurations. You will need the following files:

* [.eslintignore](https://github.com/mirego/mirego-guidelines/blob/master/http/configs/.eslintignore)
* [.eslintrc](https://github.com/mirego/mirego-guidelines/blob/master/http/configs/.eslintrc-browser)
* [.stylelintrc](https://github.com/mirego/mirego-guidelines/blob/master/http/configs/.stylelintrc)
* [.svgo.yml](https://github.com/mirego/mirego-guidelines/blob/master/http/configs/.svgo.yml)

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

We use ember-cli which depends on node.js and npm.

```shell
$ brew install node
$ npm install
```

Everytime a new package is added or an update is made in `package.json` file, you **must** update the `package-lock.json` file by running `npm install`.

## Sentry

[Sentry’s real-time error tracking](https://sentry.io/) gives you insight into production deployments and information to reproduce and fix crashes.

We use it through Mirego's account (see IT to get access) for QA and Staging environments. A team must be created for each client and a project per `app+enviroment` (eg. `accent-qa`, `accent-staging`).

For production, the account to use must be evaluated depending on your client's needs.

N.B.: Error reporting under FastBoot is currently disabled. The `ember-cli-sentry` project is currently working on the support of Sentry under FastBoot.

## Running

When running the application, you should always make sure that the required system environment variables are present.
You can use `source`, [nv](https://github.com/jcouture/nv) or a custom l33t bash script.

### Development

This starts a FastBoot-enabled development server with live code reloading.

* `npm start`

## Production

This starts a FastBoot-enabled production-ready server (`app/server.js`) with support for canonical host, SSL and `Basic` authentication.

* `npm run server`
