const path = require("path");
const HtmlWebpagkPlugin= require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
    entry: {
        "app":              "./src/index.js",
        'assets/js/banner': './src/assets/js/banner.js',
        'assets/js/tabs': './src/assets/js/tabs.js',
    },
    output: {
        path: path.join(__dirname, "/app"),
        publicPath: '/',
        filename: "[name].js",
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

            {
                test: /\.(jpeg|jpg|png|webp|svg)$/,
                exclude: /fonts/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/images",
                        }
                    }
                ]
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            }
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
            chunks: ['app']
        }),
        new HtmlWebpagkPlugin({
            filename: "components/button.html",
            template: "./src/components/button.html",
            chunks: ['app']
        }),
        new HtmlWebpagkPlugin({
            filename: "components/textfield.html",
            template: "./src/components/textfield.html",
            chunks: ['app']
        }),
        new HtmlWebpagkPlugin({
            filename: "components/card.html",
            template: "./src/components/card.html",
            chunks: ['app']
        }),
        new HtmlWebpagkPlugin({
            filename: "components/banner.html",
            template: "./src/components/banner.html",
            chunks: ['app', 'assets/js/banner']
        }),
        new HtmlWebpagkPlugin({
            filename: "components/list.html",
            template: "./src/components/list.html",
            chunks: ['app']
        }),
        new HtmlWebpagkPlugin({
            filename: "components/tabs.html",
            template: "./src/components/tabs.html",
            chunks: ['app', 'assets/js/tabs']
        }),
    ]
}