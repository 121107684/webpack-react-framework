# Webpack+React Rest Frameset 

一个完善的Webpack+React集成环境,支持模块热加载和Css热加载效果,并支持多页面入口的Webpack打包,并附加完整的config配置文件注释,可以方便的修改环境及配置


##使用的技术

- [x] [Webpack](https://webpack.github.io)
- [x] [React](https://facebook.github.io/react/)
- [x] [Babel](https://babeljs.io/)
- [x] [PostCSS](https://github.com/postcss/postcss)
- [x] [CSS modules](https://github.com/outpunk/postcss-modules)
- [x] [precss](https://github.com/jonathantneal/precss)
- [x] [autoprefixer](https://github.com/postcss/autoprefixer)

## 安装方法

```
npm install
```

## 启动热加载React框架

```
npm start
```
## 发布自动打包
```
npm run build 
```

## 其他注意
由于背景图路径问题,修改了file-loader模块,所以请安装完后替换为/node_bak中的模块,用以支持背景图打包生成的地址问题

## 开发模式config文件
```js
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
//排除的页面入口js
var jsExtract = [];

//加载webpack目录参数配置
var config = {
    devtool: 'cheap-module-eval-source-map',
    entry:getEntry(),
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'dist/js/[name].js',
        publicPath: 'http://localhost:3000/'
    },
    plugins: [
        //排除css压缩加载在页面
        new ExtractTextPlugin('dist/css/[name].css'),
        //合并额外的js包
        new CommonsChunkPlugin('lib', './dist/js/lib.js', jsExtract),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    module: {
        //加载器配置
        loaders: [{
            test: /\.css$/,
            exclude: path.resolve(__dirname, 'src/dist/css/common'),
            loaders: [
                'style-loader',
                'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap&importLoaders=1',
                'postcss-loader?sourceMap=true'
            ]
        }, {
            test: /\.css$/,
            include: path.resolve(__dirname, 'src/dist/css/common'),
            loaders: [
                'style-loader',
                'css-loader?sourceMap&importLoaders=1',
                'postcss-loader?sourceMap=true'
            ]
        }, {
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/, // 匹配不希望处理文件的路径
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|jpeg|jpg|gif)$/,
            loader: 'file?name=dist/img/[name].[ext]'
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
            require('autoprefixer'),
            require('precss')
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
        var entryArr = [];
        entryArr.push(entryPath);
        entryArr.push('eventsource-polyfill');
        entryArr.push('webpack-hot-middleware/client');
        jsExtract.push(name);
        if (entry) {
            jsExtract.push(name.substring(0, name.length - 3));
            map[entry] = entryArr;
        }
    });
    //自定义额外加载包,不会合并在页面对应js中
    map['lib'] = singleModule;
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

        config.plugins.push(new HtmlWebpackPlugin(conf));
    }
});

module.exports = config;

```

## 打包模式config文件
```js
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
var singleModule = ['react', 'react-dom', 'jquery', 'Raphael'];
//postcss辅助插件
var postcssImport = require('postcss-import');
//排除的页面入口js
var jsExtract = [];

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
        new CommonsChunkPlugin('lib', './dist/js/lib.js', jsExtract),
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
            exclude: /node_modules/, // 匹配不希望处理文件的路径
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
            require('autoprefixer'),
            require('precss')
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
        if (entry) {
            jsExtract.push(name.substring(0, name.length - 3));
            map[entry] = entryPath;
        }
    });
    //自定义额外加载包,不会合并在页面对应js中
    map['lib'] = singleModule;
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

        config.plugins.push(new HtmlWebpackPlugin(conf));
    }
});

module.exports = config;

```
# License 

MIT

