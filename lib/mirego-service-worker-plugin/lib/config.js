'use strict';

const Plugin = require('broccoli-plugin');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

module.exports = class Config extends Plugin {
  constructor(inputNodes, options) {
    super(inputNodes, {
      name: options && options.name,
      annotation: options && options.annotation
    });

    this.options = options;
  }

  build() {
    const options = this.options;
    const enableDebugging = options.enableDebugging || false;
    const enablePageCaching = options.enablePageCaching || false;
    const precacheExtensions = options.precacheExtensions || [];
    const appVersion = options.appVersion;

    const files = this.inputPaths.reduce((memo, path) => {
      const files = glob.sync('assets/**/**/*', {cwd: path, nodir: true});

      const filteredFiles = files.filter(file => {
        if (file.includes('fastboot')) return false;

        const extension = file.split('.').pop();
        return precacheExtensions.includes(extension);
      });

      return [...memo, ...filteredFiles];
    }, []);

    let module = '';
    module += `export const ENABLE_DEBUGGING = ${enableDebugging};\n`;
    module += `export const ENABLE_PAGE_CACHING = ${enablePageCaching};\n`;
    module += `export const PRECACHE_FILES = ${JSON.stringify(files)};\n`;
    module += `export const APP_VERSION = '${appVersion}';\n`;

    fs.writeFileSync(path.join(this.outputPath, 'config.js'), module);
  }
};
