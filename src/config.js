const REG_BODY_TAG = /<body[^>]*>/;

const html1 = `<html>
<head>
<title>test html</title>
<style>* {margin: 0;}</style>
</head>
<body>
<div id="app">app content is here.</div>
</body>
</html>`;
const html2 = `<html>
<head>
<title>test html</title>
<style>* {margin: 0;}</style>
</head>
<body id="bodyDom" class="body-cls">
<div id="app">app content is here.</div>
</body>
</html>`;
const html3 = `<html>
<head>
<title>test html</title>
<style>* {margin: 0;}</style>
</head>
<body id="bodyDom">
<div id="app">app content is here.</div>
</body>
</html>`;
const html4 = `<html>
<head>
<title>test html</title>
<style>* {margin: 0;}</style>
</head>
<body id="bodyDom" class="body-cls" style="margin:0;">
<div id="app">app content is here.</div>
</body>
</html>`;

for (const html of [html1, html2, html3, html4]) {
  const result = REG_BODY_TAG.exec(html);
  console.log(result?.[0]);
}

module.exports = {
  REG_BODY_TAG,
};
