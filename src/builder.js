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
const template = (content, prefix) => `(function(doc){
  if (!doc) return;
  function ready (fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }
  function appendSvg () {
    doc.body.insertAdjacentHTML('afterbegin', '${content}');
  }
  var existing = doc.getElementById('__MO_ICONS__');
  if (existing) return;
  ready(appendSvg);
  var style = doc.createElement('style');
  style.innerHTML = '.${prefix}-icon { display: inline-block; width: 1em; height: 1em; stroke-width: 0; fill: currentColor; transition: all .3s cubic-bezier(.18,.89,.32,1.28); }';
  doc.head.appendChild(style);
})(document)`;

/**
 * @param {BuilderSpec} options
 * @return {Promise<string>}
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
  const filepath = path.join(options.output, filename);
  fs.writeFileSync(filepath, template(content, options.prefix));
  return filepath;
};

module.exports = builder;
