var React = require('react');
var style = require('./../../css/style.css');

/**
创建顶部时间效果 
**/

//创建数字变化显示

var Timeshownumber = React.createClass({
            render: function() {
                var number = this.props.number ? this.props.number : 0;
                return ( < li > { number < 10 ? "0" + number : number } < /li>);
                }
            });


        var Timebox = React.createClass({
            render: function() {
                var date = new Date();
                var hour = 23 - date.getHours();
                var mins = 59 - date.getMinutes();
                var second = 59 - date.getSeconds();
                return ( < ul className = { style.time_content } >
                    < Timeshownumber number = { hour }
                    /> < li className = { style.time_nobackground } > : < /li > < Timeshownumber number = { mins }
                    /> < li className = { style.time_nobackground } > : < /li > < Timeshownumber number = { second }
                    /> < /ul >
                );
            }
        });

        var Timeroot = React.createClass({
            render: function() {
                return ( < div className = { style.time_warp } >
                    < h1 >
                    距离今天结束 < /h1> < p >
                    快制定今天的计划吧┏(゜ω゜) = ☞ < /p> < Timebox / >
                    < /div>
                );
            }
        });

        module.exports = Timeroot;
