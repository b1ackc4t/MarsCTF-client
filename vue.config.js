const CompressionPlugin = require("compression-webpack-plugin")
const isDev = process.env.NODE_ENV === 'development';
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
    outputDir: "E:\\desktop\\marsctf-docker\\nginx\\html",
    devServer: {
        disableHostCheck: true
    },
    productionSourceMap: isDev, //打包不生成map
    chainWebpack: (config) => {
        config.plugins.delete("prefetch")
        config.plugins.delete("preload")
        if (!isDev) {
            var externals = {
                vue: 'Vue',
                vuex: 'Vuex',
                'axios': 'axios',
                // 'element-plus': 'ElementPlus',
                'echarts': 'echarts'
            }
            config.externals(externals)

            const cdn = {
                css: [
                    // 'https://cdn.jsdelivr.net/npm/element-plus@1.2.0-beta.6/dist/index.min.css'
                ], // 放置css文件目录
                js: [
            'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue/3.2.26/vue.global.min.js',
                        'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/axios/0.24.0/axios.min.js',
                    'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/vuex/4.0.2/vuex.global.min.js',
                    // 'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/element-plus/1.0.2-beta.70/index.full.min.js',
                ]// 放置js文件目录
            }

            config.plugin('html').tap((args) => {
                args[0].cdn = cdn
                return args
            })
        } else {
            const cdn = {
                css: [],
                js: []
            }
            config.plugin('html').tap((args) => {
                args[0].cdn = cdn
                return args
            })

        }

    },
    configureWebpack: {
        devtool: 'source-map',
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            new CompressionPlugin({
                test: /\.(js|css)(\?.*)?$/i,//需要压缩的文件正则
                threshold: 10240,//文件大小大于这个值时启用压缩
                deleteOriginalAssets: false//压缩后保留原文件
            })
        ],
    }

}