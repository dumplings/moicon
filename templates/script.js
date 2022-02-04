module.exports = (svgStr, styleStr) => `(function(doc){
    if (!doc) return;
    function ready (fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }
    function appendSvg () {
        doc.body.insertAdjacentHTML('afterbegin', '${svgStr}');
    }
    var existing = doc.getElementById('__MO_ICONS__');
    if (existing) return;
    ready(appendSvg);
    var style = doc.createElement('style');
    style.innerHTML = '${styleStr}';
    doc.head.appendChild(style);
})(document);`;
