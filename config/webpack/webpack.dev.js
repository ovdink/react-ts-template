const webpack = require("webpack");
const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");

const APP_PORT = 3000;

module.exports = merge(commonConfig, {
    mode: "development",
    entry: [
        "react-hot-loader/patch",
        `webpack-dev-server/client?http://localhost:${APP_PORT}`,
        "webpack/hot/only-dev-server",
        "./index.tsx"
    ],
    devServer: {
        clientLogLevel: 'debug',
        historyApiFallback: true,
        open: false,
        hot: true,
        port: APP_PORT
    },
    devtool: "cheap-module-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
});
