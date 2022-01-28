#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const yargs = require('yargs');
const logger = require('./logger');

const argv = yargs(process.argv.slice(2))
    .usage('$0 <input> <output> [options]', 'Commands to compile SVG files', (args) => {
      args.positional('input', { describe: 'Directory for SVG files', type: 'string' })
          .positional('output', { describe: 'Output directory of js builder', type: 'string' });
    })
    .options({
      name: { alias: 'n', describe: 'Output builder name', type: 'string' },
      hash: { describe: 'Disable the hash', type: 'boolean' },
    })
    .alias('h', 'help')
    .alias('v', 'version')
    .argv;

const input = path.join(process.cwd(), argv.input);
const output = path.join(process.cwd(), argv.output);

console.warn(input, output, fs.existsSync(input), fs.existsSync(output));

if (!fs.existsSync(input)) {
  logger.error(`The input directory[${input}] does not exist.`);
  process.exit(1);
}

if (!fs.existsSync(output)) {
  logger.warn(`The input directory[${input}] does not exist.`);
  fs.mkdirSync(output, { recursive: true });
}

// todo abstract the name func with argv.name and argv.hash for other scene
console.log(argv, argv.name, argv.hash);
