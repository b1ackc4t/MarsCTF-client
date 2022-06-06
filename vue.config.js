// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']
const isDev = process.env.NODE_ENV === 'development';
const timeStamp = new Date().getTime();
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
            // config.plugin('compressionPlugin').use(new CompressionWebpackPlugin({
            //     filename: '[path].gz[query]',
            //     algorithm: 'gzip',
            //     test: new RegExp(
            //         '\\.(' + productionGzipExtensions.join('|') + ')$'
            //     ),
            //     threshold: 10240, // 只有大小大于该值的资源会被处理 10240
            //     minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
            //     deleteOriginalAssets: false // 删除原文件
            // }))
            // config.plugin('compressionPlugin').use(
            //     new CompressionWebpackPlugin({
            //         test: /\.(js|css|html)$/,// 匹配文件名
            //         algorithm: 'gzip',
            //         threshold: 10240,
            //         minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
            //     })
            // );
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
        output: {
            // 把应用打包成umd库格式
            library:'myLibrary',
            // 输出重构  打包编译后的文件名称  【模块名称.时间戳】
            filename: `[name].${timeStamp}.js`,
            libraryTarget:'umd',
            globalObject:'this',
        },
    }

}