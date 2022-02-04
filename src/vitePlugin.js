const path = require('path');
const core = require('./core');
const cssStr = require('../templates/cssStr');

// eslint-disable-next-line valid-jsdoc
/**
 * @param {string} filepath - SVG files path.
 * @param {string=} prefix - Icon class prefix, default is `mo`.
 * @returns {string|{transformIndexHtml(string): string, name: string}}
 */
const iconPlugin = (filepath, prefix) => {
  return {
    name: 'icon-plugin',
    /**
     * @param {string} html
     * @return {string}
     */
    async transformIndexHtml(html) {
      let htmlDom = html;
      const REG_BODY_TAG = /<body[^>]*>/;
      const REG_HEAD_TAG = /<head[^>]*>/;

      // css content append to pre-head
      const cssResult = REG_HEAD_TAG.exec(htmlDom);
      if (!cssResult) return htmlDom;
      htmlDom = htmlDom.replace(REG_HEAD_TAG, `${cssResult[0]}<style>${cssStr(prefix)}</style>`);

      // svg content append to pre-head
      const svgStr = await core(path.resolve(process.cwd(), filepath), prefix);
      const result = REG_BODY_TAG.exec(htmlDom);
      if (!result) return htmlDom;
      return htmlDom.replace(REG_BODY_TAG, `${result[0]}${svgStr}`);
    },
  };
};

module.exports = iconPlugin;
