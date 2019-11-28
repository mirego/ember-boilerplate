'use strict';

module.exports = {
  isPresent: variable => Boolean(variable),
  asBoolean: variable => ['true', '1'].includes(variable),
  asInteger: variable => parseInt(variable, 10)
};
