/* eslint-env node */

module.exports = {
  rules: {
    'attribute-indentation': {'open-invocation-max-len': 80},
    'bare-strings': true,
    'block-indentation': 2,
    'eol-last': 'always',
    'html-comments': true,
    'inline-link-to': true,
    'link-rel-noopener': true,
    'no-debugger': true,
    'no-duplicate-attributes': true,
    'no-log': true,
    'no-trailing-spaces': true,
    'quotes': 'double',
    'self-closing-void-elements': true,
    'simple-unless': true,
    'style-concatenation': true,
    'table-groups': true,
    'template-length': [true, {min: 1, max: 200}],
    'triple-curlies': true,
    'unused-block-params': true
  }
};
