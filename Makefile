# Configuration
# -------------

APP_NAME = `grep -m1 name package.json | awk -F: '{ print $$2 }' | sed 's/[ ",]//g'`
APP_VERSION = `grep -m1 version package.json | awk -F: '{ print $$2 }' | sed 's/[ ",]//g'`
GIT_REVISION = `git rev-parse HEAD`
DOCKER_IMAGE_TAG ?= latest
DOCKER_REGISTRY ?=

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
	@echo ""
	@printf "\033[33m%-23s\033[0m" "DOCKER_IMAGE_TAG"
	@printf "\033[35m%s\033[0m" $(DOCKER_IMAGE_TAG)
	@echo ""
	@printf "\033[33m%-23s\033[0m" "DOCKER_REGISTRY"
	@printf "\033[35m%s\033[0m" $(DOCKER_REGISTRY)

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

.PHONY: build
build: ## Build the Docker image
	docker build --rm --tag $(APP_NAME):$(DOCKER_IMAGE_TAG) .

.PHONY: push
push: ## Push the Docker image
	docker tag $(APP_NAME):$(DOCKER_IMAGE_TAG) $(DOCKER_REGISTRY)/$(APP_NAME):$(DOCKER_IMAGE_TAG)
	docker push $(DOCKER_REGISTRY)/$(APP_NAME):$(DOCKER_IMAGE_TAG)

# CI targets
# -------------------

.PHONY: lint
lint: lint-prettier lint-eslint lint-tslint lint-stylelint lint-template-lint ## Run lint tools on the code

.PHONY: lint-prettier
lint-prettier:
	npx prettier -l ember-cli-build.js testem.js '{app,tests,config,scripts,service-worker,node-server/}/**/*.{ts,js,graphql,scss}' '**/*.md'

.PHONY: lint-eslint
lint-eslint:
	npx eslint ember-cli-build.js testem.js app/ tests/ config/ scripts/ service-worker/ node-server/

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
	npx prettier --write ember-cli-build.js testem.js '{app,tests,config,scripts,service-worker,node-server}/**/*.{ts,js,graphql,scss}' '**/*.md'

.PHONY: format-svgo
format-svgo:
	npx svgo --config=.svgo.yml

.PHONY: typecheck
typecheck:
	npx tsc

.PHONY: build-app
build-app:
	npm run build

# Development targets
# -------------------

.PHONY: dev-start
dev-start: build ## Start every service of in the Docker Compose environment
	docker-compose up

.PHONY: dev-stop
dev-stop: ## Stop every service of in the Docker Compose environment
	docker-compose down
