const md5 = require('md5');
const fs = require('fs');

const builder = ({ content, output, name='moicon', hash=false }) => {
  let filename = name;
  if (hash) filename += `.${md5(content).slice(24)}`;
  filename += '.js';
  console.log(filename, output, fs);
  // todo
};

module.exports = builder;
