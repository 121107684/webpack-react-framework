/*变量提升*/

a = 2;
var a;
console.log(a); // 2

console.log(a);
var a = 2; // undefined

/*变量提升 function*/


foo(); // bar
var foo = function bar() { //这是一个函数表达式，不再是函数声明。
    console.log('bar');
};
foo(); // bar
bar(); // undefinded

/*变量提升 function*/

var foo;
foo(); //TypeError，因为还没有赋值
bar(); //bar不可以在全局范围内引用
foo = function bar() {
    console.log('bar');
};

/*变量提升 函数声明比变量声明优先*/

foo(); //输出的结果为1
var foo;

function foo() {
    console.log(1);
}
foo = function() {
    console.log(2);
};
foo(); //2 


function foo() {
    console.log(1);
}
foo(); //2
foo = function() {
    console.log(2);
};


var bool = true;
if (bool) {
    window.fns = function fn() { console.log(1) };
} else {
    window.fns = function fn() { console.log(2) };
}


var arr = [1, 2, 3, 4, 5];

for (let i = arr.length - 1; i >= 0; i--) {

}

console.log(i);

/*不存在变量提升*/

console.log(foo); // 输出undefined
console.log(bar); // 报错ReferenceError

var foo = 2;
let bar = 2;

var tmp = 123;

/*暂时性死区*/

if (true) {
    tmp = 'abc'; // ReferenceError
    let tmp;
}

/*暂时性死区 区块里出现let 前面的同名变量都是不可用的*/

if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}

/*变量死区 由于y没有申明,*/

function bar(x = y, y = 2) {
    return [x, y];
}

bar(); // 报错

function bar(x = 2, y = x) {
    return [x, y];
}
bar(); // [2, 2]


//javascript - call

//Using call to chain constructors for an object

function Product(name, price) {
    this.name = name;
    this.price = price;

    if (price < 0) {
        throw RangeError('This price not allow lower zero');
    }
}

function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
}

function Toy(name, price) {
    Product(name, price);
    this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
console.log(cheese);
//print out: Food {name: 'feta', price: 5, category: 'food'}
console.log(fun);
//print out: Toy {category: 'toy'}

//Using call to invoke an anonymous function 

var list = [{
    price: 40,
    name: 'cake'
}, {
    price: 60,
    name: 'cookie'
}];

for (var i = 0, len = list.length; i < len; i++) {
    (function(i) {
        this.print = function() {
            console.log('#' + i + ' name:' + this.name + ' price:' + this.price);
        }
        this.print();
        console.log(list[i]);
    }).call(list[i], i);
}

/*数组的解构赋值*/

var [a, b, c] = [1, 2, 3];
console.log(a); //1

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // 'a'
y // undefined
z // []

let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4

//只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值。

function* fibs() {
    var a = 0;
    var b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5

/*结构复制可以设置默认值*/

var [foo = true] = [];
foo // true

    [x, y = 'b'] = ['a']; // x='a', y='b'
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'

/*注意，ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。*/

var [x = 1] = [undefined];
x // 1

var [x = 1] = [null];
x // null

/*默认值是惰性求值*/

function f() {
    console.log('aaa');
}

let [x = f()] = [1];

/*默认值可以引用解构赋值的其他变量，但该变量必须已经声明*/

let [x = 1, y = x] = []; // x=1; y=1
let [x = 1, y = x] = [2]; // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = []; // ReferenceError

/*可以解构对象*/
var { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // 'aaa'
bar // 'bbb'

var { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined

/*如果变量名和属性名不一样,可以写成*/

var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // 'aaa'

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

/*对象解构可以嵌套,且p是模式不会被赋值*/

var obj = {
    p: [
        'Hello',
        { y: 'World' }
    ]
};

var { p: [x, { y }] } = obj;
x // 'Hello'
y // 'World'
p // error: p is undefined


/*嵌套复制*/

let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

obj // {prop:123}
arr // [true]

/*对象解构方法*/

let { log, sin, cos } = Math;

/*函数move的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值。如果解构失败，x和y等于默认值。*/

function move({ x = 0, y = 0 } = {}) {
    return [x, y];
}

move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]


/*下面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。*/

function move({ x, y } = { x: 0, y: 0 }) {
    return [x, y];
}

move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]

/*解构的用途 （1）交换变量的值*/

[1, 2] = [x, y];
[x, y] = [y, x];

/*解构的用途 （2）从函数返回多个值*/

// 返回一个数组

function example() {
    return [1, 2, 3];
}
var [a, b, c] = example();



// 返回一个对象

function example() {
    return {
        foo: 1,
        bar: 2
    };
}
var { foo, bar } = example();

/*（3）函数参数的定义 解构赋值可以方便地将一组参数与变量名对应起来。*/

// 参数是一组有次序的值
function f([x, y, z]) {... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({ x, y, z }) {... }
f({ z: 3, y: 2, x: 1 });


/*(4)提取JSON数据*/

var jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]

/*(5)函数参数的默认值 指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。*/

jQuery.ajax = function(url, {
    async = true,
    beforeSend = function() {},
    cache = true,
    complete = function() {},
    crossDomain = false,
    global = true,
    // ... more config
}) {
    // ... do stuff
};

/*（6）遍历Map结构*/
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
    console.log(key + " is " + value);
}
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
    console.log(key + " is " + value);
}

/*(7)输入模块的指定方法 加载模块时，往往需要指定输入那些方法。解构赋值使得输入语句非常清晰。*/

const { SourceMapConsumer, SourceNode } = require("source-map");

/*字符串模板可以嵌套并调用方法*/


const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;

const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));

// <table>
//
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
//
// </table>

/*引用模板字符串本身，在需要时执行，可以像下面这样写*/

let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
func('Jack') // "Hello Jack!"

/*实时模板编译*/

var template = `
<ul>
  <% for(var i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;

/*数组ES6新方法*/

let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
  console.log(p);
});

/*ES6函数新方法,可以设置默认值*/

function log(x, y = 'World') {
  console.log(x, y);
}

/*ES6函数新方法,可以设置结构*/

function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined, 5
foo({x: 1}) // 1, 5
foo({x: 1, y: 2}) // 1, 2
foo() // TypeError: Cannot read property 'x' of undefined

/*ES6函数新方法,设置结构方法可以设置默认值*/

function fetch(url, { method = 'GET' } = {}) {
  console.log(method);
}

fetch('http://example.com')
// "GET"


/*两种写法的区别*/

// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}


// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x和y都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x有值，y无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x和y都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]


/*传入undefined，将触发该参数等于默认值，null则没有这个效果*/

function foo(x = 5, y = 6) {
  console.log(x, y);
}

foo(undefined, null)
// 5 nul

/*使用=>的function this都是外层的this*/
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1

/*对象申请简洁表示方法*/

var foo = 'bar';
var baz = {foo};
baz // {foo: "bar"}

// 等同于
var baz = {foo: fooo};

function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}
