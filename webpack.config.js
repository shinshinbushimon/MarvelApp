const path = require('path');
require('dotenv').config();
const webpack = require('webpack');

module.exports = {

    // 開発用サーバのプロキシ設定    
    entry: './src/app.tsx',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: './public',
    },
    devServer: {
        static: [
            {
                directory: path.resolve(__dirname, 'public'),
                publicPath: "/",
            },
            {
                directory: __dirname,
                publicPath: "/",
            },
        ],
        
        proxy: [
            {
              context: ['/first-ope'],
              target: 'http://localhost:3001',
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
        alias: {
            'RecoilAtom': path.resolve(__dirname, 'RecoilAtom.ts'),
            'customHooks': path.resolve(__dirname, 'customHooks.ts'),
            'src': path.resolve(__dirname, 'src/')
          },
    
        extensions: [".ts", ".tsx", ".js"],
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
          'process.env.REQUEST_URL': JSON.stringify(process.env.SERVER_DEV_URL)
      })
    ]
}