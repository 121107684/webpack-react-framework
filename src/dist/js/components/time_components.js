var React = require('react');
var style = require('./../../css/style.css');

/**
创建顶部时间效果 
**/

//创建数字变化显示

var Timeshowhours = React.createClass({
    render: function() {
    	var hour = 23-this.props.date.getHours();
        return (
        	<li>
        	{hour<10?"0"+hour:hour}
        	</li>
        );
    }
});

var Timeshowmins = React.createClass({
    render: function() {
    	var mins = 59-this.props.date.getMinutes();
        return (
        	<li>
        	{mins<10?"0"+mins:mins}
        	</li>
        );
    }
});

var Timeshowsecond = React.createClass({
    render: function() {
    	var second = 59-this.props.date.getSeconds();
        return (
        	<li>
        	{second<10?"0"+second:second}
        	</li>
        );
    }
});

var Timebox = React.createClass({
    render: function() {
        return (
            <ul className={style.time_content} data = {this.props.date}>
            	<Timeshowhours  date={new Date()} />
            	<li className={style.time_nobackground}>:</li>
            	<Timeshowmins date={new Date()}/>
            	<li className={style.time_nobackground}>:</li>
            	<Timeshowsecond date={new Date()}/>
            </ul>
        );
    }
});

var Timeroot = React.createClass({
    render: function() {
        return (
        	<div className={style.time_warp}>
        		<h1>
        			距离今天结束
        		</h1>
        		<p>
        		快制定今天的计划吧 ┏ (゜ω゜)=☞
        		</p>
            	<Timebox />
            </div>
        );
    }
});

module.exports = Timeroot;