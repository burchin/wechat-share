module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
        }
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      { "legacy": true }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      { "loose": true }
    ],
    "@babel/plugin-proposal-object-rest-spread",
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
    ]
  ]
};
