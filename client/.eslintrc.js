module.exports = {
  extends: [
      'alloy',
      'alloy/react',
      'alloy/typescript',
  ],
  env: {
    browser: true,
    jquery: true,
    node: true,
    commonjs: true,
    es6: true,
    webextensions: true,
  },
  globals: {
      React: true
  },
  rules: {
      // 这里填入你的项目需要的个性化配置
  }
};