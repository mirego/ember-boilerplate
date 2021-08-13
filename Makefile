# Build configuration
# -------------------

APP_NAME = `grep -m1 name package.json | awk -F: '{ print $$2 }' | sed 's/[ ",]//g'`
APP_VERSION = `grep -m1 version package.json | awk -F: '{ print $$2 }' | sed 's/[ ",]//g'`
GIT_REVISION = `git rev-parse HEAD`
DOCKER_IMAGE_TAG ?= $(APP_VERSION)
DOCKER_REGISTRY ?=
DOCKER_LOCAL_IMAGE = $(APP_NAME):$(DOCKER_IMAGE_TAG)
DOCKER_REMOTE_IMAGE = $(DOCKER_REGISTRY)/$(DOCKER_LOCAL_IMAGE)

# Linter and formatter configuration
# ----------------------------------

PRETTIER_FILES_PATTERN = ember-cli-build.js testem.js '{app,config,fastboot,lib,node-server,public,scripts,tests,translations,types,vendor}/**/*.{ts,js,graphql,scss}' '**/*.md'
STYLES_PATTERN = './app/**/*.scss'
TEMPLATES_PATTERN = './app/**/*.hbs'

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
	@echo ""
	@printf "\033[33m%-23s\033[0m" "DOCKER_LOCAL_IMAGE"
	@printf "\033[35m%s\033[0m" $(DOCKER_LOCAL_IMAGE)
	@echo ""
	@printf "\033[33m%-23s\033[0m" "DOCKER_REMOTE_IMAGE"
	@printf "\033[35m%s\033[0m" $(DOCKER_REMOTE_IMAGE)
	@echo "\n"

.PHONY: targets
targets:
	@echo "\033[34mTargets\033[0m"
	@echo "\033[34m---------------------------------------------------------------\033[0m"
	@perl -nle'print $& if m{^[a-zA-Z_-\d]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-22s\033[0m %s\n", $$1, $$2}'

# Build targets
# -------------

.PHONY: build
build: ## Build the Docker image
	docker build --build-arg APP_NAME=$(APP_NAME) --build-arg APP_VERSION=$(APP_VERSION) --rm --tag $(DOCKER_LOCAL_IMAGE) .

.PHONY: push
push: ## Push the Docker image to the registry
	docker tag $(DOCKER_LOCAL_IMAGE) $(DOCKER_REMOTE_IMAGE)
	docker push $(DOCKER_REMOTE_IMAGE)

# Development targets
# -------------------

.PHONY: dependencies
dependencies: ## Install dependencies required by the application
	npm install

.PHONY: dependencies
ci-dependencies: ## Install dependencies required by the application in CI
	npm ci

.PHONY: build-app
build-app: ## Build the application
	npm run build

.PHONY: test
test: ## Run the test suite
	rm -rf ./coverage && COVERAGE=true npx ember test --reporter dot

# Check, lint and format targets
# ------------------------------

.PHONY: check
check: check-format check-types ## Run various checks on project files

.PHONY: check-format
check-format:
	npx prettier --check $(PRETTIER_FILES_PATTERN)

.PHONY: check-types
check-types:
	npx tsc

.PHONY: check-code-overage
check-code-coverage:
	node ./scripts/check-code-coverage.js

.PHONY: format
format: ## Format project files
	- npx prettier --write $(PRETTIER_FILES_PATTERN)
	- npx stylelint $(STYLES_PATTERN) --fix --quiet
	- npx eslint --ext .js,.ts . --fix --quiet
	- count=`find ./public/ -type f -name '*.svg' | wc -l` ; \
		if [ $$count != 0 ] ; then \
			npx svgo --config=svgo.config.js --recursive --folder ./public ; \
		fi;

.PHONY: lint
lint: lint-scripts lint-styles lint-templates ## Lint project files

.PHONY: lint-scripts
lint-scripts:
	npx eslint --ext .js,.ts .

.PHONY: lint-styles
lint-styles:
	npx stylelint $(STYLES_PATTERN)

.PHONY: lint-templates
lint-templates:
	npx ember-template-lint $(TEMPLATES_PATTERN)
