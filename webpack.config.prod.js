// 本番build用
require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    // プロジェクトのエントリポイント(tsファイル: ts-loader使っているため)
    entry: './src/app.tsx',
    // minify処理がされないのでコンパイル後のファイルの確認できる。
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        // root空の相対パスで、メモリに保持されたbundle.jsを参照するため変更が即座に反映
        //publicPath: '/dist', 本番では、最適化ファイルをデプロイするだけなのでこれも不要
    },
    devServer: {
        static: [
          {
            directory: path.resolve(__dirname, "public"),
            publicPath: "/",
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
        exclude: /node_modules|(__tests__|\.test\.js$|\.spec\.js$)/,
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
    // ワークフロー全体に適応される
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
    })
    ]
};

