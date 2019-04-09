# Configuration
# -------------

APP_NAME ?= `grep -m1 name package.json | awk -F: '{ print $$2 }' | sed 's/[ ",]//g'`
APP_VERSION ?= `grep -m1 version package.json | awk -F: '{ print $$2 }' | sed 's/[ ",]//g'`
GIT_REVISION ?= `git rev-parse HEAD`

# Introspection targets
# ---------------------

.PHONY: help
help: header targets

.PHONY: header
header:
	@echo "\033[34mEnvironment\033[0m"
	@echo "\033[34m---------------------------------------------------------------\033[0m"
	@printf "\033[33m%-23s\033[0m" "APP_NAME"
	@printf "\033[35m%s\033[0m" $(APP_NAME)
	@echo ""
	@printf "\033[33m%-23s\033[0m" "APP_VERSION"
	@printf "\033[35m%s\033[0m" $(APP_VERSION)
	@echo ""
	@printf "\033[33m%-23s\033[0m" "GIT_REVISION"
	@printf "\033[35m%s\033[0m" $(GIT_REVISION)

.PHONY: targets
targets:
	@echo "\033[34mTargets\033[0m"
	@echo "\033[34m---------------------------------------------------------------\033[0m"
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-22s\033[0m %s\n", $$1, $$2}'

# Build targets
# -------------

.PHONY: dependencies
dependencies:
	npm install

.PHONY: lint
lint: lint-prettier lint-eslint lint-tslint lint-stylelint lint-template-lint ## Run lint tools on the code

.PHONY: lint-prettier
lint-prettier:
	npx prettier -l ember-cli-build.js testem.js '{app,tests,config,scripts,service-worker}/**/*.{ts,js,graphql,scss}' '**/*.md'

.PHONY: lint-eslint
lint-eslint:
	npx eslint ember-cli-build.js testem.js app/ tests/ config/ scripts/ service-worker/

.PHONY: lint-tslint
lint-tslint:
	npx tslint '{app,tests,config,service-worker}/**/*.ts'

.PHONY: lint-stylelint
lint-stylelint:
	npx stylelint './app/**/*.scss'

.PHONY: lint-template-lint
lint-template-lint:
	npx ember-template-lint './app/**/*.hbs'

.PHONY: test
test: ## Run the test suite
	rm -rf ./coverage && COVERAGE=true npx ember exam --split 5 --parallel

.PHONY: test-coverage
test-coverage: ## Run the test suite with the code coverage report
	npx nyc check-coverage

.PHONY: format
format: format-prettier format-svgo ## Run formatting tools on the code

.PHONY: format-prettier
format-prettier:
	npx prettier --write ember-cli-build.js testem.js '{app,tests,config,scripts,service-worker}/**/*.{ts,js,graphql,scss}' '**/*.md'

.PHONY: format-svgo
format-svgo:
	npx svgo --config=.svgo.yml

.PHONY: typecheck
typecheck:
	npx tsc
