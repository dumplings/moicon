const { optimize } = require('svgo');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const util = require('util');

/**
 * default function to initial framework
 * @param {function} cb
 */
async function defaultTask(cb) {
  const rawData = fs.readFileSync(path.resolve(__dirname, './examples/svgs/edit.svg'));
  console.log(rawData.toString());
  console.log('-------------------------');
  const result = optimize(rawData, {
    // path: path.resolve(__dirname, './output/test.svg'),
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      {
        name: 'removeAttrs',
        params: {
          attrs: '(fill|stroke)',
        },
      },
    ],
  });
  console.log(result);
  console.log('-------------------------');
  const result2 = await xml2js.parseStringPromise(result.data);
  console.log(util.inspect(result2, false, 4));
  cb();
}

exports.default = defaultTask;
