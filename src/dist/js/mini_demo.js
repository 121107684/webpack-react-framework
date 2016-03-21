'use strict';
var reset = require('./../css/common/reset.css');
var style = require('./../css/style.css');
var React = require('react');
var ReactDOM = require('react-dom');


var Hello = React.createClass({
    render: function() {
        return (
            <span className={style.timeBox} style={this.props.color}>
                {this.props.date}
            </span>
        );
    }
});

setInterval(function() {
    var color = '#' + parseInt(Math.random() * 999999);
    var divStyle = {
        color: color
    };
    var date = new Date();
    var dateString = date.toLocaleTimeString();
    ReactDOM.render(
        <Hello color={divStyle} date={dateString} />,
        document.getElementById('root')
    );
}, 1000);
