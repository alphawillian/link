const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/traffic/html',
  outputDir: 'html',
  assetsDir: 'static',
  pages: {
    page1: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  lintOnSave: true, // 开发期间校验eslint
  runtimeCompiler: false, //
  productionSourceMap: true, // 生产map文件
  chainWebpack: (config) => { // 对webpack进行细粒度更改
    // config.resolve.symlinks(true);
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('components', resolve('./src/components'))
      .set('api', resolve('./src/api'))
      .set('common', resolve('./src/common'))
  },
  css: {
    modules: false, // false 只把文件名为 *.module.[ext] 的文件当做modules处理
    // extract: true, // 是否将组件中的CSS提取到独立的CSS文件中（而不是在JavaScript中内联并动态注入）
    sourceMap: false, // 是否为CSS启用源映射 将此设置为true可能会影响构建性能
    loaderOptions: {} // 将选项传递给与CSS相关的加载器 修改css相关加载器配置 css-loader postcss-loader sass-loader less-loader stylus-loader
  },
  devServer: { // 支持webpack-dev-server的所有选项
    // proxy: 'http://localhost:4000'
    host: 'pc.jd.com',
    port: '80',
    https: false
  },
  parallel: require('os').cpus().length > 1 // 是否使用线程加载器进行Babel或TypeScript转换
  // pwa: {}, // pwa设置
  // pluginOptions: {} // 给插件传值
}
