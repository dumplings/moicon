const path = require('path');
const fs = require('fs');
const svgo = require('svgo');
const xml2js = require('xml2js');

// const builder = new xml2js.Builder({ headless: true });

/**
 * @param {string} filepath - svg files path
 * @return {{colorful:boolean, data:string, id:string}[]}
 */
const packageSvgList = (filepath) => {
  const files = fs.readdirSync(path.resolve(filepath), { encoding: 'utf8', withFileTypes: true });
  const result = [];

  for (const file of files) {
    if (!file.isFile() || path.extname(file.name) !== '.svg') continue;
    // detect the colorful flag by file name with the `.c.svg` suffix.
    const colorful = /\.c.svg$/.test(file.name);
    const data = fs.readFileSync(path.join(filepath, file.name), { encoding: 'utf8' });
    // delete the colorful flag from filename
    const id = file.name.substring(0, file.name.length - (colorful ? 6 : 4));

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
}

// todo test function
;(async () => {
  const rootPath = path.resolve(__dirname, '../examples/svg/');
  const svgList = packageSvgList(rootPath);
  for (const file of svgList) {
    const parseResult = await xml2js.parseStringPromise(optimize(file), {
      explicitRoot: false,
    });
    console.log(parseResult);
  }
})();
