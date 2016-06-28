'use strict';
var reset = require('./../css/common/reset.css');
var style = require('./../css/style.css');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

var Hello = React.createClass({
    render: function() {
        return (
            <span className={style.timeBox} style={this.props.color}>
                {this.props.date}
            </span>
        );
    }
});

class MyComponent extends React.Component {
    render() {
        return <div>Hello World</div>;
    }
}
var DOMStr = ReactDOMServer.renderToStaticMarkup(<MyComponent />);
var stacticStr = ReactDOMServer.renderToStaticMarkup(<MyComponent />);
console.log(DOMStr, stacticStr);

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
