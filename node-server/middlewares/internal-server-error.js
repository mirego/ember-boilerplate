/* eslint-env node */

'use strict';

const fs = require('fs');

module.exports = (_error, _request, response, _next) => {
  fs.readFile('app/error-pages/internal-error-page.js', 'utf8', (_, data) => {
    // Remove anything before and after the main <html> element
    data = data
      .replace(/\n/g, ' ')
      .replace(/<\/html>.*/, '</html>')
      .replace(/.*<html>/, '<html>');

    response.writeHead(response.statusCode, {
      'Content-Type': 'text/html; charset=UTF-8'
    });

    response.end(data);
  });
};
