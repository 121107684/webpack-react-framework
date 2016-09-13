import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/common/style.css';

export default class Radio extends React.Component {
    render() {
        const { className, ...others } = this.props;
        const cls = classNames({
            mfui_check: true,
            [className]: className
        });
        return (
            <div>
                <input className={cls} type="radio" {...others}/>
                <span className="mfui_icon_checked"></span>
            </div>
        );
    }
};
