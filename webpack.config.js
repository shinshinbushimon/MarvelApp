const path = require('path');

module.exports = {
    entry: './src/app.tsx',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist',
    },
    devServer: {
        static: [
            {
                directory: path.resolve(__dirname, 'dist'),
                publicPath: "/dist",
            },
            {
                directory: __dirname,
                publicPath: "/",
            },
        ],
    },
    devtool: "eval",
    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    }
}