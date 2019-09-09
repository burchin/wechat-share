const { existsSync } = require('fs');
const { resolve } = require('path');
const { sync } = require('glob');
const { src } = require('./dirs');

let JSReg = /([\w-]+)(?=\/index.tsx)/;

const htmls = [];
const entries = sync(resolve(src, './app/**/index.tsx')).reduce((entArr, item) => {
  const name = item.match(JSReg)[1];

  // 配置html-webpack-plugin
  // 如果没有个性化页面模板，启用公共模板
  let template = resolve(src, `./app/${name}/index.ejs`);
  if (!existsSync(template)) {
    template = resolve(src, `./app/common.ejs`);
  }

  htmls.push({
    name,
    template
  });

  entArr[name] = item;
  return entArr;
}, {});

module.exports = { entries, htmls };