import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
import $ from "jquery";
import reset from "../css/common/reset.css";
import demo from "../css/demo.css";

var json = ['text', 'asdsad'];

class Content extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        for (var i = 0; i < json.length; i++) {
            return (
                <p className={demo.content}>
                 {json[i]}
                 </p>
            );
        }


    }
}


class Title extends Component {
    render() {
        return (
            <h1  className={demo.title}>标题</h1>
        );
    }
}


class Wrap extends Component {
    render() {
        return (
            <div>
                <Title />
                <Content />
            </div>
        );
    }
}


render(<Wrap/>, document.getElementById('demo'));
