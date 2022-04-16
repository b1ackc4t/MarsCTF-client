
module.exports = {
    outputDir: "E:\\code_java\\marsctf-server\\src\\main\\resources\\public",
    devServer: {
        disableHostCheck: true
    },
    productionSourceMap: false, //打包不生成map
    chainWebpack: config => {
        // 移除 prefetch 插件 预加载去除
        config.plugins.delete('prefetch');
        // 移除 preload 插件
        config.plugins.delete('preload');
    },
}