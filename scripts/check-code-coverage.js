const CONFIG = require('../config/coverage-check');

let COVERAGE_REPORT;

try {
  //eslint-disable-next-line node/no-missing-require
  COVERAGE_REPORT = require('../coverage/coverage-summary.json');
} catch (_error) {
  console.error(
    'Coverage file not found, try running tests with coverage before running this script.'
  );
}

const GREEN = '\033[0;32m';
const RED = '\033[0;31m';
const YELLOW = '\033[0;33m';
const GRAY = '\033[0;90m';
const WHITE = '\033[0;37m';
const NO_COLOR = '\033[0m';

const colorForPercent = (value, type, isExcluded) => {
  if (isExcluded) return GRAY;

  if (value < CONFIG.watermarks[type][0]) {
    return RED;
  }

  if (value >= CONFIG.watermarks[type][1]) {
    return GREEN;
  }

  return YELLOW;
};

const colorText = (string, color) => {
  return `${color}${string}${NO_COLOR}`;
};

const pad = (string, maxLength, character = ' ') => {
  const paddingLength = maxLength - string.length;

  const padding = Array(paddingLength)
    .fill(character)
    .join('');

  return `${string}${padding}`;
};

const valuePassesThresholds = value => {
  return ['lines', 'statements', 'branches', 'functions'].every(type => {
    return value[type].pct >= CONFIG.thresholds[type];
  });
};

const isExcluded = value => {
  return (
    value.lines.total === 0 &&
    value.statements.total === 0 &&
    value.branches.total === 0 &&
    value.functions.total === 0
  );
};

const reports = Object.entries(COVERAGE_REPORT);

const longestFileName = Math.max.apply(
  null,
  reports.map(([fileName]) => fileName.length)
);

const FILE_NAME_CELL_WIDTH = longestFileName;
const TABLE_WITH = longestFileName + 55;
const VALUE_WIDTH = 12;

console.log(pad('\n', TABLE_WITH, '-'));
console.log(
  pad('Filename', FILE_NAME_CELL_WIDTH),
  '|',
  pad('Statements', 12),
  '|',
  pad('Branches', 12),
  '|',
  pad('Functions', 12),
  '|',
  pad('Lines', 12)
);
console.log(pad('', FILE_NAME_CELL_WIDTH + 55, '-'));

let errorCode = 0;

reports.forEach(([key, value]) => {
  const fileIsExcluded = isExcluded(value);

  const colorForStatements = colorForPercent(
    value.statements.pct,
    'statements',
    fileIsExcluded
  );
  const colorForBranches = colorForPercent(
    value.branches.pct,
    'branches',
    fileIsExcluded
  );
  const colorForFunctions = colorForPercent(
    value.functions.pct,
    'functions',
    fileIsExcluded
  );
  const colorForLines = colorForPercent(
    value.lines.pct,
    'lines',
    fileIsExcluded
  );

  const passes = valuePassesThresholds(value);

  if (!passes && !fileIsExcluded) {
    errorCode = 1;
  }

  console.log(
    colorText(pad(key, FILE_NAME_CELL_WIDTH), fileIsExcluded ? GRAY : WHITE),
    '|',
    colorText(pad(`${value.statements.pct}%`, VALUE_WIDTH), colorForStatements),
    '|',
    colorText(pad(`${value.branches.pct}%`, VALUE_WIDTH), colorForBranches),
    '|',
    colorText(pad(`${value.functions.pct}%`, VALUE_WIDTH), colorForFunctions),
    '|',
    colorText(pad(`${value.lines.pct}%`, VALUE_WIDTH), colorForLines)
  );
});

console.log(pad('', TABLE_WITH, '-'));

if (errorCode === 0) {
  console.log(`\n${colorText('▶▶ Code coverage passed!', GREEN)}\n`);
} else {
  console.log(
    `\n${colorText('▶▶ Code coverage didn’t meet the thresholds', RED)}\n`
  );
}

// eslint-disable-next-line no-process-exit
process.exit(errorCode);
