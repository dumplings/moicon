#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const yargs = require('yargs');
const logger = require('./logger');
const builder = require('./builder');

const argv = yargs(process.argv.slice(2))
    .usage('$0 <input> <output> [options]', 'Commands to compile SVG files', (args) => {
      args.positional('input', { describe: 'Directory of SVG files', type: 'string' })
          .positional('output', { describe: 'Output directory of js builder', type: 'string' });
    })
    .options({
      name: { alias: 'n', describe: 'Output builder name', default: 'moicon', type: 'string' },
      prefix: { alias: 'p', describe: 'The prefix of all icon class name', default: 'mo', type: 'string' },
      hash: { describe: 'Disable the hash', default: false, type: 'boolean' },
    })
    .alias('h', 'help')
    .alias('v', 'version')
    .locale('en')
    .argv;

const input = path.join(process.cwd(), argv.input);
const output = path.join(process.cwd(), argv.output);

if (!fs.existsSync(input)) {
  logger.error(`The input directory[${input}] does not exist.`);
  process.exit(1);
}

// todo abstract the name func with argv.name and argv.hash for other scene
builder({
  input,
  output,
  prefix: argv.prefix,
  name: argv.name,
  hash: argv.hash,
}).then((filepath) => logger.info('Finished: ', filepath));
