const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js','.jsx'],
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: {
              loader: 'babel-loader', // 使用 babel-loader 处理 ES Modules
              options: {
                presets: ['@babel/preset-env'] // 使用 @babel/preset-env 转换 ES Modules 语法
              }
            },
            exclude: /node_modules/
        }]
    },
    devtool: process.env.NODE_ENV == 'production' ? false : 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // 指定静态文件目录
        },
        compress: false,
        host: 'localhost',
        port: 8089,
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dist']
        }),
        new HtmlWebpackPlugin({
            template: './src/template/index.html'
        })
    ]
}