module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        targets: {
          chrome: '49' // 按自己需要填写
        },
        useBuiltIns: 'entry',
        corejs: { version: 3, proposals: true }
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false
      }
    ]
  ]
}
