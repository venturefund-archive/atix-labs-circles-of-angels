module.exports = {
  env: {
    dev: {},
    production: {},
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ],
        '@babel/preset-react'
      ]
    }
  }
};
