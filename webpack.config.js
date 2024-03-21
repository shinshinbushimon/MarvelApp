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
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },

            {
                test: /\.(js|jsx)$/, // .jsファイルに適用
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    }
}