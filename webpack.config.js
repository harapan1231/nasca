module.exports = {
    // ビルドの起点となるファイルの設定
    entry: './vehicle/app.jsx',
    // 出力されるファイルの設定
    output: {
        // 出力先のパス
        path: __dirname + '/www',
        // 出力先のファイル名
        filename: 'app.js' 
    },
    // ソースマップをファイル内に出力させる
    devtool: 'inline-source-map',
    module: {
        // loaderの設定
        loaders: [{
            // 対象となるファイルの拡張子（正規表現可）
            test: /\.jsx$/, 
            // 除外するファイル／ディレクトリ（正規表現可）
            exclude: /node_modules/, 
            // 使用するloader
            loader: 'babel-loader' 
        }]
    }
};
