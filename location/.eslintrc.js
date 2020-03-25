module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    // '@vue/airbnb'
    'standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": [0, "always"],
    // 生成器函数*的前后空格
    'generator-star-spacing': 'off',
    // 箭头函数用小括号括起来
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 文件以单一的换行符结束
    'eol-last': 0,
    // 函数定义时括号前面要不要有空格
    'space-before-function-paren': [0, 'always'],
    // 空行最多不能超过100行
    'no-multiple-empty-lines': [0, { max: 100 }],
    // 一行结束后面不要有空格
    'no-trailing-spaces': 0,
    // 禁止重复声明变量
    'no-redeclare': 2,
    // new时必须加小括号
    'new-parens': 2,
    // 使用严格模式
    strict: 2,
    // 缩进风格
    indent: [2]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}