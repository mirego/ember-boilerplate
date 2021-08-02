'use strict';

// Vendor
const url = require('url');

// Constants
const PERMANENT_REDIRECT_STATUS_CODE = 301;
const canonicalHost = process.env.CANONICAL_HOST;

const NON_ROOT_TRAILING_SLASH_REGEXP = /^.+\/$/;
const TRAILING_SLASH_REGEXP = /\/+$/;

module.exports = (request, response, next) => {
  const parsedUrl = new URL(request.url, `${request.protocol}://${canonicalHost}`);

  if (!NON_ROOT_TRAILING_SLASH_REGEXP.test(parsedUrl.pathname)) return next();

  parsedUrl.pathname = parsedUrl.pathname.replace(TRAILING_SLASH_REGEXP, '');

  response.redirect(PERMANENT_REDIRECT_STATUS_CODE, parsedUrl.pathname + parsedUrl.search + parsedUrl.hash);
};
