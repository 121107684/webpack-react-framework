'use strict';
var reset = require('./../css/reset.css');
var style = require('./../css/style.css');
var React = require('react');
var ReactDOM = require('react-dom');


var Hello = React.createClass({
    render: function() {
        return (
            <span className="timeBox" style={this.props.color}>TIME:{this.props.date.toTimeString()}
            </span>
        );
    }
});

setInterval(function() {
    var color = '#' + parseInt(Math.random() * 999);
    var divStyle = {
        color: color
    };
    ReactDOM.render(
        <Hello color={divStyle} date={new Date()} />,
        document.getElementById('root')
    );
}, 500);
