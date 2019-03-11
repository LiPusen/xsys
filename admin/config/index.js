var path = require('path')
// 编译参数配置, 包括热启动和构建
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // 是否启动文件压缩
    productionGzip: false,
    showEslintErrorsInOverlay: false,
    productionGzipExtensions: ['js', 'css', 'svg'],
    // 模块分析报告
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 3006,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/wp': {
            // target: 'http://172.30.50.139:8082',
            target: 'http://172.30.10.143:18088',
            changeOrigin: true,
            pathRewrite: {
                '^/wp/': '/'
            }
        },
        '/yc': {
            // target: 'http://172.30.50.139:8082',
            target: 'http://172.30.10.143:18088',
            changeOrigin: true,
            pathRewrite: {
                '^/yc/': '/'
            }
        },
        '/proxy': {
            target: 'http://172.30.10.143:18088',
            changeOrigin: true,
            pathRewrite: {
                '^/proxy/': '/'
            }
        }
    },
    // css文件路径映射
    cssSourceMap: false
  }
}
