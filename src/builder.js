/* eslint-disable max-len */
const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const core = require('./core');
const logger = require('./logger');

// eslint-disable-next-line valid-jsdoc
/**
 * @param {string} content - svg html
 * @param {string} prefix - class prefix
 * @return string
 */
const template = (content, prefix) => {
  const cssStr = require('../templates/cssStr')(prefix);
  return require('../templates/script')(content, cssStr);
};

/**
 * @param {BuilderSpec} options
 * @return {Promise<void>}
 */
const builder = async (options) => {
  const content = await core(options.input, options.prefix);
  let filename = options.name || 'moicon';
  const output = options.output;
  if (options.hash) filename += `.${md5(content).slice(24)}`;
  filename += '.js';
  if (!fs.existsSync(output)) {
    logger.warn(`The input directory[${output}] does not exist.`);
    fs.mkdirSync(output, { recursive: true });
  }
  fs.writeFileSync(path.join(options.output, filename), template(content, options.prefix));
};

module.exports = builder;
