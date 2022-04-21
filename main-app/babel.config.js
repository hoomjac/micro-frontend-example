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
      'import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false
      }
    ]
  ]
}
