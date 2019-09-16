'use strict';

// Vendor
const url = require('url');

// Constants
const PERMANENT_REDIRECT_STATUS_CODE = 301;
const canonicalHost = process.env.CANONICAL_HOST;

module.exports = (request, response, next) => {
  const parsedUrl = new URL(
    request.url,
    `${request.protocol}://${canonicalHost}`
  );

  if (!parsedUrl.pathname.match(/\/{2,}/)) return next();

  response.redirect(
    PERMANENT_REDIRECT_STATUS_CODE,
    parsedUrl.pathname.replace(/\/{2,}/g, '/')
  );
};
