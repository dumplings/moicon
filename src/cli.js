#!/usr/bin/env node
// create uuid by content
// const { v5: uuidv5 } = require('uuid');

console.log('moicon cli running start');
const argvs = process.argv.slice(2);
const filepath = argvs[0];
const output = argvs[1] || process.cwd();
// const uuid = uuidv5('moicon', 'helloworld');
// const filename = argvs[2] || `moicon.script.${uuid}.js`;
console.log(argvs, filepath, output, process);
console.log('moicon cli running end');
