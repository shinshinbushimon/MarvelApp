// 本番build用

const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    // プロジェクトのエントリポイント(tsファイル: ts-loader使っているため)
    entry: './src/app.tsx',
    // minify処理がされないのでコンパイル後のファイルの確認できる。
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // root空の相対パスで、メモリに保持されたbundle.jsを参照するため変更が即座に反映
        //publicPath: '/dist', 本番では、最適化ファイルをデプロイするだけなのでこれも不要
    },
    devServer: {
        static: [
          {
            directory: path.resolve(__dirname, "dist"),
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
    },
    // ワークフロー全体に適応される
    plugins: [
        new CleanPlugin.CleanWebpackPlugin(), // 過去のdist配下のファイルを削除するので常に最新化できる
    ]
};

