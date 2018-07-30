#!/usr/bin/env sh

error_status=0

RED='\033[0;31m'
RED_BOLD='\033[1;31m'
GREEN='\033[0;32m'
GREEN_BOLD='\033[1;32m'
YELLOW='\033[0;33m'
NO_COLOR='\033[0m'

OLD_REPO_NAME=ember-boilerplate
NEW_REPO_NAME=client-project-webapp
PROJECT_SHORT_NAME=shortname

header() {
  echo "\n\n${YELLOW}▶ $1${NO_COLOR}"
}

if [[ ! -x "/usr/bin/find" || ! -x "/usr/bin/sed" ]]; then
  echo "\n${RED}↳ ${RED_BOLD}find${RED} and/or ${RED_BOLD}sed${RED} commands not found ✘${NO_COLOR}"
  exit
fi

header "📦  Replacing repo name in package.json and package-lock.json"
/usr/bin/sed -i '' "s/$OLD_REPO_NAME/$NEW_REPO_NAME/g" package.json package-lock.json &&

echo "${GREEN}↳ Done ✔${NO_COLOR}"

header "🔍  Replacing project name in .js, .json and .html files"
for file in `/usr/bin/find . -type f -name "*.js" -or -name "*.html" -or -name "*.json"`; do
  /usr/bin/sed -i '' "s/$OLD_REPO_NAME/$PROJECT_SHORT_NAME/g" $file
done

echo "${GREEN}↳ Done ✔${NO_COLOR}"
