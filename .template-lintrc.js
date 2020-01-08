'use strict';

module.exports = {
  extends: 'octane',
  rules: {
    'attribute-indentation': {'open-invocation-max-len': 80},
    'block-indentation': 2,
    'eol-last': 'always',
    'no-bare-strings': true,
    'no-trailing-spaces': true,
    'quotes': 'double',
    'self-closing-void-elements': true,
    'template-length': [true, {min: 1, max: 200}]
  }
};
