const chalk = require('chalk');

const logger = {
  info(...str) {
    console.log(chalk.green('[Info]', ...str));
  },
  error(...str) {
    console.log(chalk.red('[Error]', ...str));
  },
  warn(...str) {
    console.log(chalk.yellow('[Warn]', ...str));
  },
};

module.exports = logger;
