// Specifications for various object types used in moicon
// This is primarily for documentation
(() => {
  /**
   * The Payload of the SVG builder in the transformation process.
   * @typedef SvgPayload
   * @property {boolean} colorful - if true, the currentColor not work on svg icon. Only when the svg
   *           builder name with the `.c.svg` suffix, the value is true.
   * @property {string} data - the html string of svg.
   * @property {string} id - the id of svg, like `prefix-svg-builder-name`
   */

  /**
   * The BuilderSpec of builder func.
   * @typedef BuilderSpec
   * @property {string} input - The directory of the SVG files.
   * @property {string} output - The directory of the output js file.
   * @property {string=} name - The name of the output js file, default is `moicon`.
   * @property {string=} prefix - The prefix of all icon class name, default is `mo`'.
   * @property {boolean=} hash - When true, a hash value is appended to the output file name suffix.
   */
})();
