var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true,
    lazy: false,
    historyApiFallback: false
}));

app.use(require('webpack-hot-middleware')(compiler));

var serveIndex = require('serve-index');
app.use('/', serveIndex(path.join(__dirname, '/src')));
app.use('/', express.static(path.join(__dirname, '/assets')));


// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, './src/todo.html'));
// });



app.listen(3000, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:3000');
});
