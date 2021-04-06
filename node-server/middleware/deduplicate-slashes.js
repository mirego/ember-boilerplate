'use strict';

// Vendor
const url = require('url');

// Constants
const PERMANENT_REDIRECT_STATUS_CODE = 301;
const canonicalHost = process.env.CANONICAL_HOST;

const MULTIPLE_SLASHES_REGEXP = /\/{2,}/g;

module.exports = (request, response, next) => {
  const parsedUrl = new URL(request.url, `${request.protocol}://${canonicalHost}`);

  if (!MULTIPLE_SLASHES_REGEXP.test(parsedUrl.pathname)) return next();

  parsedUrl.pathname = parsedUrl.pathname.replace(MULTIPLE_SLASHES_REGEXP, '/');

  response.redirect(PERMANENT_REDIRECT_STATUS_CODE, parsedUrl.pathname + parsedUrl.search + parsedUrl.hash);
};
