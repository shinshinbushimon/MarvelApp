// 本番build用
require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    // プロジェクトのエントリポイント(tsファイル: ts-loader使っているため)
    entry: './src/app.tsx',
    // minify処理がされないのでコンパイル後のファイルの確認できる。
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/public',
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules|(__tests__|\.test\.js$|\.spec\.js$)/,
            },
            {
                test: /\.(js|jsx)$/, // .jsファイルに適用
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
                exclude: /node_modules|(__tests__|\.test\.js$|\.spec\.js$)/,
            },
            {
                test: /\.d\.ts$/, // 追加: 型定義ファイルを無視するルール
                loader: 'ignore-loader'
            },
        ],
    },
    resolve: {
        alias: {
            'RecoilAtom': path.resolve(__dirname, 'RecoilAtom.ts'),
            'customHooks': path.resolve(__dirname, 'customHooks.ts'),
            'src': path.resolve(__dirname, 'src/'),
            'type': path.resolve(__dirname, 'src/type'),
            'src/type/app': path.resolve(__dirname, 'src/type/app'),
            'src/type/enum': path.resolve(__dirname, 'src/type/enum'),
        },
        extensions: [".ts", ".tsx", ".js", ".d.ts"],
    },
    plugins: [
        new CleanWebpackPlugin(), // 全て消し去る
        new CopyPlugin({
            patterns: [
                { from: 'index.html', to: 'index.html' },
                { from: 'style.css', to: 'style.css' }
            ],
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'), 
            'process.env.REQUEST_URL': JSON.stringify(process.env.SERVER_PROD_URL),
            'process.env.TLS_CA_FILE': JSON.stringify(process.env.PRODUCTION_TLS_CA_FILE),
        }),
    ],
    stats: {
        errorDetails: true,
        logging: 'verbose'
    },
    infrastructureLogging: {
        level: 'verbose'
    }
};
