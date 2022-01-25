const path = require('path');
const fs = require('fs');
const svgo = require('svgo');
const xml2js = require('xml2js');
const { minify } = require('html-minifier');

const builder = new xml2js.Builder({ headless: true });

/**
 * @param {string} filepath - svg files path
 * @param {string} prefix - svg id`s prefix
 * @return {SvgPayload[]}
 */
const packagePayloadList = (filepath, prefix) => {
  const files = fs.readdirSync(path.resolve(filepath), { encoding: 'utf8', withFileTypes: true });
  const result = [];

  for (const file of files) {
    if (!file.isFile() || path.extname(file.name) !== '.svg') continue;
    // detect the colorful flag by file name with the `.c.svg` suffix.
    const colorful = /\.c.svg$/.test(file.name);
    const data = fs.readFileSync(path.join(filepath, file.name), { encoding: 'utf8' });
    // delete the colorful flag from filename
    const id = `${prefix}-${file.name.substring(0, file.name.length - (colorful ? 6 : 4))}`;

    result.push({ colorful, data, id });
  }

  return result;
};

/**
 * @param {SvgPayload} file
 * @return {string}
 */
const optimize = (file) => {
  const plugins = [{
    name: 'preset-default',
    params: {
      overrides: { removeViewBox: false },
    },
  }];
  if (!file.colorful) {
    plugins.push({
      name: 'removeAttrs',
      params: { attrs: '(fill|stroke)' },
    });
  }
  return svgo.optimize(file.data, plugins).data;
};

/**
 * build symbol node html
 * @param {object} data - the parse result from the xml2js
 * @param {string} id - icon name
 * @return {string}
 */
const buildSymbolNode = (data, id) => {
  const symbol = {};
  for (const key in data) {
    if (key === '$') {
      symbol[key] = {
        id,
        viewBox: data[key].viewBox,
      };
    } else {
      symbol[key] = data[key];
    }
  }
  return builder.buildObject({ symbol });
};

/**
 * Assembles the contents of all SVG files in the specified directory into an HTML string.
 * @param {string} rootPath - The directory where the SVG files are stored.
 * @param {string=} prefix - The ID prefix of icon, default is `mo`.
 * @return {Promise<string>}
 */
const core = async (rootPath, prefix='mo') => {
  let SVGHtml = '<svg xmlns="http://www.w3.org/2000/svg" id="__MO_ICONS__" style="display:none">';
  const payloadList = packagePayloadList(rootPath, prefix);
  for (const payload of payloadList) {
    const parseResult = await xml2js.parseStringPromise(optimize(payload), {
      explicitRoot: false,
    });
    const str = buildSymbolNode(parseResult, payload.id);
    SVGHtml += str;
  }
  SVGHtml += '</svg>';
  return minify(SVGHtml, { collapseWhitespace: true });
};

module.exports = core;
