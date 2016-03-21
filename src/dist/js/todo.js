'use strict';
var reset = require('./../css/common/reset.css');
var style = require('./../css/style.css');
var React = require('react');
var ReactDOM = require('react-dom');
//引入time组件
var Timeroot = require('./components/time_components.js');

//插入头部时间栏
setInterval(function() {
	ReactDOM.render(
	    <Timeroot />,
	    document.getElementById('time_root')
	);
}, 500);

