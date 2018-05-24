# Boilerplate code for Ember.js

## Browser support

| Browser            | OS      | Constraint        |
|--------------------|---------|-------------------|
| …                  | …       | …                 |

## Environment variables

All environment variables needed (or supported) to run this application are listed in [`.env.dev`](./.env.dev).

## Heroku buildpack

To successfully deploy applications from this boilerplate code on Heroku, you must use Heroku’s [emberjs buildpack](https://github.com/heroku/heroku-buildpack-emberjs) (follow instructions under _Usage_).

## Linting

All projects using the `ember-boilerplate` must include the latest `eslint`, `stylelint` and `svgo` configurations. You will need the following files:

* `.eslintrc`
* `.stylelintrc`
* `.svgo.yml`

They all are stored in the [mirego-horizontal-web](https://github.com/mirego/mirego-horizontal-web) repository.

After you have copied the files, open `.travis.yml` and remove the comment for the lines below `script`:

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

## SVGs

All projects using `ember-boilerplate` must use the `ember-inline-svg` addon to inline SVGs in the HTML output.

_If you do not need to style the SVG (eg. change its `fill` property), you should use the `<img>` tag._

### SVG with dynamic styling

* Use the `inline-svg` helper from the `ember-inline-svg` addon;
* Do not specify the extension;
* Do not specify the full path. The configuration in `ember-cli-build.js` already defines the default folder for SVGs to `public/assets/inline-svgs`;
* File must be located at `public/assets/inline-svgs`;

```
{{inline-svg 'icon-arrow'}}
```

### SVG without dynamic styling

* Use the `<img>` tag;
* Must specify extension and full path;
* File must be located at `public/assets/images`:

```
<img src="/assets/images/icon-arrow.svg" />
```

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
