const path = require('path');
const fs = require('fs');
const svgo = require('svgo');
const xml2js = require('xml2js');

const builder = new xml2js.Builder({ headless: true });

/**
 * @param {string} filepath - svg files path
 * @param {string} prefix - svg id`s prefix
 * @return {{colorful:boolean, data:string, id:string}[]}
 */
const packageSvgList = (filepath, prefix) => {
  const files = fs.readdirSync(path.resolve(filepath), { encoding: 'utf8', withFileTypes: true });
  const result = [];

  for (const file of files) {
    if (!file.isFile() || path.extname(file.name) !== '.svg') continue;
    // detect the colorful flag by file name with the `.c.svg` suffix.
    const colorful = /\.c.svg$/.test(file.name);
    const data = fs.readFileSync(path.join(filepath, file.name), { encoding: 'utf8' });
    // delete the colorful flag from filename
    const id = `${prefix}-${file.name.substring(0, file.name.length - (colorful ? 6 : 4))}`;

    result.push({
      colorful,
      data,
      id,
    });
  }

  return result;
};

/**
 * @param {{colorful:boolean, data:string}} file
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
}

// todo test function
;(async (rootPath, prefix) => {
  let svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" id="__MO_ICONS__" style="display:none">';
  const svgList = packageSvgList(rootPath, prefix);
  for (const file of svgList) {
    const parseResult = await xml2js.parseStringPromise(optimize(file), {
      explicitRoot: false,
    });
    const result = buildSymbolNode(parseResult, file.id);
    svgHtml += result;
  }
  svgHtml += '</svg>';
  console.log(svgHtml);
})(path.resolve(__dirname, '../examples/svg/'), 'mo');
