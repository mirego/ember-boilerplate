#!/usr/bin/env sh

error_status=0

RED='\033[0;31m'
RED_BOLD='\033[1;31m'
GREEN='\033[0;32m'
GREEN_BOLD='\033[1;32m'
YELLOW='\033[0;33m'
NO_COLOR='\033[0m'

OLD_REPO_NAME=ember-boilerplate
OLD_PACKAGE_NAME=ember-boilerplate
NEW_REPO_NAME=client-project-webapp
NEW_PACKAGE_NAME=short-project-name

header() {
  echo "\n\n${YELLOW}▶ $1${NO_COLOR}"
}

if [[ ! -x "/usr/bin/find" || ! -x "/usr/bin/sed" ]]; then
  echo "\n${RED}↳ ${RED_BOLD}find${RED} and/or ${RED_BOLD}sed${RED} commands not found ✘${NO_COLOR}"
  exit
fi

header "📦  Replacing repo name in package.json"
/usr/bin/sed -i '' "s/https:\/\/github.com\/mirego\/$OLD_REPO_NAME/https:\/\/github.com\/mirego\/$NEW_REPO_NAME/g" package.json &&

echo "${GREEN}↳ Done ✔${NO_COLOR}"

header "🔍  Replacing package name in .js, .ts, .json and .html files"
for file in `/usr/bin/find . \( -type f -name "*.js" -or -name "*.ts" -or -name "*.html" -or -name "*.json" \) -and ! -path "./node_modules/*"`; do
  /usr/bin/sed -i '' "s/$OLD_PACKAGE_NAME/$NEW_PACKAGE_NAME/g" $file
done

echo "${GREEN}↳ Done ✔${NO_COLOR}"
