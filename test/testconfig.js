//加载Node的fs模块
var fs = require('fs');
//加载Node的Path模块
var path = require('path');
//srcDir为当前开发目录(/src)
var srcDir = path.resolve(process.cwd(), 'src');
//加载自动化HTML自动化编译插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
//排除的页面入口js
var jsExtract = [];

var getIP = require('ipware')().get_ip;
app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    console.log(ipInfo);
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
});

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

        if (entry) {
            jsExtract.push(name.substring(0, name.length - 3));
            map[entry] = entryArr;
        }
    });
    map['lib'] = ['react'];
    map['vender'] = ['jquery'];
    return map;
}

var config = {
    entry: getEntry(),
    plugins: []
};


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
        //console.log(conf)
        // config.plugins.push(new HtmlWebpackPlugin(conf));

    }
});
