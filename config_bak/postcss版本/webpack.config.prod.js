'use strict';
//加载Node的Path模块
var path = require('path');
//加载Node的fs模块
var fs = require('fs');
//加载webpack模块
var webpack = require('webpack');
//srcDir为当前开发目录(/src)
var srcDir = path.resolve(process.cwd(), 'src');
//srcDir为当前建立目录(/assets)
var assetsDir = path.resolve(process.cwd(), 'assets');
//加载自动化css独立加载插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//加载自动化HTML自动化编译插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
//加载JS模块压缩编译插件
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
//加载公用组件插件
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//设置需要排除单独打包的插件
var singleModule = ['react', 'react-dom', 'jquery'];
//postcss辅助插件
var postcssImport = require('postcss-import');

//加载webpack目录参数配置
var config = {
    devtool: 'source-map',
    entry: getEntry(),
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'dist/js/[name].js',
        publicPath: ''
    },
    plugins: [
        //排除css压缩加载在页面
        new ExtractTextPlugin('dist/css/[name].css'),
        //合并额外的js包
        new webpack.optimize.CommonsChunkPlugin({
            // 提取出的公共模块的名称，js会打包为common.js，css为common.css
            // common.js会按照module.exports中output的路径打包，
            // common.css会按照ExtractTextPlugin插件设置的路径打包
            //如果按照网上的例子直接写为common.js,
            //会导致提取出来的公共css被打包成css/js/common.js/css
            name: 'common',
            //chunks----从哪些文件中提取
            //目前这里不需要设置，因为所有js文件都需要被提取
            //chunks: getEntry('./public/src/js/Entry/*/**.js')

        }),
        // new CommonsChunkPlugin('lib', './dist/js/lib.js', ['todo', 'mini-demo']),
        //new webpack.optimize.CommonsChunkPlugin('lib', './dist/js/lib.js'),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    module: {
        //加载器配置
        loaders: [{
            test: /\.css$/,
            exclude: path.resolve(__dirname, 'src/dist/css/common'),
            loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
        }, {
            test: /\.css$/,
            include: path.resolve(__dirname, 'src/dist/css/common'),
            loader: ExtractTextPlugin.extract('style', 'css!postcss-loader')
        }, {
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|jpeg|jpg|gif)$/,
            loader: 'file?name=../img/[name].[ext]&to=dist/img/[name].[ext]'
        }, {
            test: /\.(woff|eot|ttf)$/i,
            loader: 'url?limit=10000&name=dist/fonts/[name].[ext]'
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },
    postcss: function(webpack) {
        return [
            postcssImport({
                addDependencyTo: webpack
            }),
            require('postcss-display-inline-block'),
            require('autoprefixer')
        ];
    }
};


//设置入口文件
function getEntry() {
    var jsDir = path.resolve(srcDir, 'dist/js');
    var names = fs.readdirSync(jsDir);
    var map = {};
    names.forEach(function(name) {
        var m = name.match(/(.+)\.js$/);
        var entry = m ? m[1] : '';
        var entryPath = entry ? path.resolve(jsDir, name) : '';
        if (entry) map[entry] = entryPath;
    });
    //自定义额外加载包,不会合并在页面对应js中
    singleModule.forEach(function(name) {
        map[name] = [name];
    });
    return map;
}

var pages = fs.readdirSync(srcDir);
pages.forEach(function(filename) {
    var m = filename.match(/(.+)\.html$/);
    if (m) {
        var conf = {
            template: path.resolve(srcDir, filename),
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: true, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            },
            filename: filename
        };

        if (m[1] in config.entry) {
            conf.chunks = ['vendors', m[1]];
        }
        //自定义额外加载包,不会合并在页面对应js中
        singleModule.forEach(function(name) {
            conf.chunks.push(name);
        });
        config.plugins.push(new HtmlWebpackPlugin(conf));
    }
});

module.exports = config;
