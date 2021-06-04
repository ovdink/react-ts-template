const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const GENERAL = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
    },
    plugins: [
        /* Иницаилизация html шаблона */
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
        /* Сохранение стилей в отдельный файл */
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
        /* Перенос статичных файлов */
        // new CopyPlugin([{ from: path.resolve(__dirname, 'static') }]),
    ],
    module: {
        /* Загрузчики файлов */
        rules: [
            /* Стили */
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            /* TS/TSX */
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        corejs: 3,
                                        useBuiltIns: 'usage',
                                    },
                                ],
                                '@babel/preset-react',
                                '@babel/preset-typescript',
                            ],
                            plugins: ['@emotion'],
                        },
                    },
                ],
            },
            /* Изображения */
            {
                test: /\.(png|jp(e*)g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 30000,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    '@svgr/webpack',
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 30000,
                        },
                    },
                ],
            },
            /* Шрифты */
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts',
                },
            },
        ],
    },
    resolve: {
        alias: {
            test: path.resolve(__dirname, 'src', 'test'),
            types: path.resolve(__dirname, 'src', 'types'),
            components: path.resolve(__dirname, 'src', 'components'),
        },
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    },
};

const DEVELOPMENT = {
    devServer: {
        contentBase: path.resolve('static'),
        clientLogLevel: 'debug',
        host: 'localhost',
        port: 3000,
        hot: true,
    },
    devtool: 'source-map',
    mode: 'development',
};

const PRODUCTION = {
    plugins: [new CleanWebpackPlugin(), ...GENERAL.plugins],
    mode: 'production',
};

module.exports = (env = {}) => {
    const MODE = env.production ? PRODUCTION : DEVELOPMENT;

    return {
        ...GENERAL,
        ...MODE,
    };
};