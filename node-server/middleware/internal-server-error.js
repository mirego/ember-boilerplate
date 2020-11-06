'use strict';

const fs = require('fs');

const internalServerError = require('../error-pages/internal-server-error');

module.exports = (error, _request, response, _next) => {
  // eslint-disable-next-line no-console
  console.error(error);

  const responseHTML = internalServerError(error);

  response.writeHead(response.statusCode, {
    'Content-Type': 'text/html; charset=UTF-8',
  });

  response.end(responseHTML);
};
