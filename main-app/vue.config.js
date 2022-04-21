/*eslint-disable*/
const path = require('path')
const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: IS_PROD ? '././' : '/',
  outputDir: path.resolve(__dirname, 'dist/app'),
  css: {
    extract: false,
    loaderOptions: {
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#4f7ecb',
            'menu-item-vertical-margin': '0px',
            'menu-item-active-bg': '#4f7ecb',
            'menu-item-active-border-width': '0px'
          },
          javascriptEnabled: true
        }
      }
    }
  },
  configureWebpack: {
    externals: {
      'crypto-js': 'CryptoJS'
    },
    output: {
      filename: 'index.js'
    }
  },
  productionSourceMap: false
}
