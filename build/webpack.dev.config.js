const base = require("./webpack.base.config")
const merge = require("webpack-merge")
const webpack = require("webpack")
const config = require('.././config/dev.config')

module.exports = merge(base, {
    // This contains additional production settings
    plugins: [
        new webpack.DefinePlugin({
            "process": {
                env: config
            }
        })
    ],
    devServer: {
        port: 9393,
        host: "localhost",
        overlay: true,
        disableHostCheck: true,
        proxy : {
            '/api/*': { "secure": false, "changeOrigin": true, "target": "https://tunde.eplaza.cloud"},
            '/files/*': { "secure": false, "changeOrigin": true, "target": "https://tunde.eplaza.cloud"},
            '/images/*': { "secure": false, "changeOrigin": true, "target": "https://tunde.eplaza.cloud"},
        }
    }
})
