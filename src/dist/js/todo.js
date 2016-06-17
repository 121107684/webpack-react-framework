'use strict';
var reset = require('./../css/common/reset.css');
var style = require('./../css/style.css');
var temp = require('./../css/common/temp.css');
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


var data = [
    { 'id': 'todo-1', 'text': '爱城市', 'state': 'false' },
    { 'id': 'todo-2', 'text': '政务服务网', 'state': 'false' },
    { 'id': 'todo-3', 'text': '机关事务所', 'state': 'false' },
    { 'id': 'todo-4', 'text': '政务网', 'state': 'false' }
];

var js = 3;

var liDom;

var Todolist = React.createClass({
    getInitialState: function() {
        return { value: '' };
    },
    handleChange: function(event) {
        this.setState({ value: event.target.value.substr(0, 40) });
    },
    handleOnClick: function() {
        var text = this.refs.todoInput.value.trim();
        if (text) {
            var obj = { 'id': 'todo-' + (js++), 'text': text, 'state': 'false' };
            data.push(obj);
            liDom.setState({ data: data });
        } else {
            alert('请填写内容');
        }

    },
    render: function() {
        var value = this.state.value;
        return (
            <div className={style.todo_list} >
                <h2>
                    <textarea placeholder='输入自己的任务,开始不一样的效率工作~'  onChange={this.handleChange}  ref='todoInput'  />
                    <input type='button' value='提交' onClick={this.handleOnClick} />
                </h2>
                <Todoli  data = {data}/>
            </div>
        );
    }
});

var Todoli = React.createClass({
    getInitialState: function() {
        liDom = this;
        return { data: data };
    },
    handleOnClick: function(event) {
        var arrIndex = 0;
        var id = event.target.getAttribute('data-id');
        data.map(function(listData) {
            if (listData.id == id) {
                data.splice(arrIndex, 1);
            }
            arrIndex++;
        });
        this.setState({ data: data });

    },
    handleCheckboxOnClick: function(event) {
        var arrIndex = 0;
        var id = event.target.getAttribute('data-id');
        data.map(function(listData) {
            if (listData.id == id) {
                data[arrIndex].state == 'true' ? data[arrIndex].state = 'false' : data[arrIndex].state = 'true';
            }
            arrIndex++;
        });
        this.setState({ data: data });
    },
    render: function() {
        var datas = this.state.data;
        var liObj = this;
        var todoNodes = datas.map(function(todoData) {
            var styles = ((todoData.state == 'true') ? style.active : '');
            console.log(styles);
            return (
                <li className={styles}>
                <i className='fr' data-id={todoData.id} onClick={liObj.handleOnClick}>X</i>
                <input type='checkbox'  data-id={todoData.id}  onClick={liObj.handleCheckboxOnClick} />
                <span>{todoData.text}</span>
            </li>
            );
        });
        return (
            <ul ref='todoList'>
                {todoNodes}
            </ul>
        );
    }
});

var React = require('react');

var Todolistclose = React.createClass({

    render: function() {
        return (
            <i className='fr' onClick={this.handleOnClick} >X</i>
        );
    }

});

module.exports = Todolistclose;

ReactDOM.render(
    <Todolist />,
    document.getElementById('todo_root')
);