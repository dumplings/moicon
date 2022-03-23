module.exports = (prefix) => `.${prefix}-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    fill: currentColor;
    transition: all .3s cubic-bezier(.18,.89,.32,1.28);
}`.replace(/\n/g, '');
