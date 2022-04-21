/*eslint-disable*/
const path = require('path')
const IS_PROD = process.env.NODE_ENV === 'production'
const APP_NAME = require('./package.json').name

module.exports = {
  publicPath: IS_PROD ? '././' : '/',
  devServer: {
    port: 10001,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      library: APP_NAME,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${APP_NAME}`
    }
  },
  productionSourceMap: false
}
