import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/common/style.css';

export default class List extends Component {
    render() {
        const { className, children, ...others } = this.props;
        const Component = this.props.href ? 'a' : this.props.htmlFor ? 'label' : 'div';
        const style = classNames({
            mfui_list: true,
            [className]: className
        });
        return (
            <Component className={style} {...others}>{children}</Component>
        );
    }
}
