const chalk = require('chalk');

const logger = {
  info(...str) {
    console.log(chalk.green('[MOICON Info]', ...str));
  },
  error(...str) {
    console.log(chalk.red('[MOICON Error]', ...str));
  },
  warn(...str) {
    console.log(chalk.yellow('[MOICON Warn]', ...str));
  },
};

module.exports = logger;
