#!/usr/bin/env node
const argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('$0 <input> <output> [options]', 'Package the SVG file and generate the JS file', (yargs) => {
      yargs.positional('input', { describe: 'Directory for SVG files', type: 'string' })
          .positional('output', { describe: 'Output directory of js file', type: 'string' });
    })
    .options({
      name: { alias: 'n', describe: 'Output file name', type: 'string' },
      hash: { describe: 'Disable the hash', type: 'boolean' },
    })
    .alias('h', 'help')
    .alias('v', 'version')
    .argv;

console.log(argv);
