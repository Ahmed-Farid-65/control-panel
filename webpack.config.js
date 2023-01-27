const path = require("path");
const HtmlWebpagkPlugin= require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
    entry: {
        "app": "./src/index.js",
    },
    output: {
        path: path.join(__dirname, "/app"),
        publicPath: '/',
        filename: "app.js",
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "app")
        },
        open: true,
        port: 8080,
        devMiddleware: {
            writeToDisk: true,
        },
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },

            {
                test: /.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },

            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                exclude: /images/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/fonts",
                        }
                    }
                ]
            },
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
        new CssMinimizerPlugin(),
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(
            {filename: "css/style.css",}
        ),
        new HtmlWebpagkPlugin({
            filename: "index.html",
            template: "./src/index.html",
        }),
    ]
}