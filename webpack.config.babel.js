import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = {

    entry: {
        index: './src/js/index.js'
    },

    module: {
        rules: [
            {

                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader'
                }
            }
        ]
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "./js/[name].bundle.js"
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'Index',
            template: path.resolve(__dirname, './src/index.html'),
            chunks: ['index']
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/assets', to: './assets' }
            ]
        })
    ],
    devtool: 'eval-source-map',
    mode: "development",
    devServer: {
        static: path.resolve(__dirname, './dist'),
        port: 3000,
        open: true
    }
}
