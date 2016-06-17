'use strict';
var reset = require('./../css/common/reset.css');


//function包含function(方法可以嵌套方法)

function add(a) {
    return a + a;
}

function square(a) {
    return a * a;
}

var sum = square(add(2));
console.log(sum);

//数组reverse和push

var arr = [];

arr.push(1, 2, 3, 4, 5);
console.log(arr.reverse());
console.log(arr);

//定义构造函数初始化一个对象

function Point(x, y) {
    this.x = x;
    this.y = y;
}

var p = new Point(1, 1);
console.log(p);

//定义Point的扩展方法
Point.prototype.r = function() {
    return this.x * this.y;
};

console.log(p.r());


//定义全局对象

var global = this;
console.log(global);
console.log(this);

//对象变成字符
var arr = [1, 2, 3, 4, 5];
console.log(arr.toString());
var data = new Date();
console.log(data.valueOf());
var arr = [];
console.log(arr.toString());
var str = '';
console.log(str.toString());

//嵌套作用域
var scope = 'g';

function a() {
    var scope = 'a';

    function b() {
        var scope = 'b';
        return scope;
    }
    return b();

}
a();

//表达式

var obj = { x: 1, y: 2 };
var adviseObj = { diff: (obj.x - obj.y), add: (obj.x + obj.y) };
obj.x = 2;
console.log(adviseObj); //数据不变 Object {diff: -1, add: 3}

//in方法

var inObj = { x: 1, y: 1 };
console.log('x' in inObj);
console.log('z' in inObj);
console.log('toString' in inObj);
console.log(1 in inObj);

var arr = [1, 2, 3, 4];
console.log('0' in arr);
console.log('1' in arr);
console.log(1 in arr);
console.log(4 in arr);

//赋值运算

var a = b = c = 1;
a += 1;
console.log(a);
console.log(b);
console.log(c);

var a = 1;
var b = a;
b += 1;
console.log(a);
console.log(b);

//delete运算符
var obj = { x: 1, y: 2 };
delete obj.x;
console.log(obj);

var arr = [1, 2, 3];
delete arr[2];
console.log(arr);

//多循环嵌套
for (var i = 0, j = 10; i < j; i++, j--) {
    console.log(i * j);
}

//数组复制 for写法
var arrA = [1, 2, 3, 4];
var arrB = [];
this.copyArray = function copyArray(a, b) {
    for (var i = 0; i < a.length; b[i] = a[i++]);
};
copyArray(arrA, arrB);
console.log(arrB);

//with表达式 循环输出document的属性 严格
/*
with(document) {
    console.log(document.body);
    console.log(document.body.id);
}
*/


//优化循环数组
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for (var i = 0, len = arr.length; i < len; i++) {
    console.log(arr[i]);
}

//排除稀松数组循环
var arr = [1, 2, 3, 4, 5, undefined, 6, 7, 8, 9];
for (var i = 0, len = arr.length; i < len; i++) {
    if (!arr[i]) continue;
    console.log(arr[i]);
}


var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
delete arr[5];

for (var index in arr) {
    if (!arr.hasOwnProperty(index)) continue;
    console.log(arr[index]);
}

//数组方法join
var arr = [1, 2, -3, 4, 5, 0, 7, 8, 9];
delete arr[5];
console.log(arr.join('-'));
//数组方法reverse
console.log(arr.reverse());

//数组排序方法
var arr = [1, 2, -3, 4, 5, 0, 7, 8, 9];
delete arr[5];
arr.sort(function(a, b) {
    return a - b;
});

//数组不区分大小写排序
var arr = ['ant', 'Bug', 'cat', 'Dog'];
arr.sort(function(s, t) {
    var a = s.toLowerCase();
    var b = t.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
});

//数组splice()方法
var arr = [1, 2, 3, 4, 5, 6, 7, 8];
arr.splice(4);

//数组arr的reduce和reduceRight方法
var arr = [1, 2, 3, 4, 5, 6, 7, 8];
var sum = arr.reduce(function(x, y) {
    return x + y;
}, 0);
console.log(sum);

//对象的创建,创建一个空的对象

var obj = Object.create(null);
console.dir(obj); //不会继承prototype

var obj2 = {};
console.dir(obj2); //会继承prototype

//对象创建并满足自定义属性的增加方法

function addList(a, b, c) {
    a[b] = c;
}

//对象继承关系测试

var o = {};
o.x = 1;
var p = o;
p.y = 2;
var q = p;
console.log(o);
console.log(p);
q.x = 3;
o.z = 4;
console.log(o);
console.log(p);
console.log(q);

//对象元素不存在时不会报错,会返回undefined

var len = book && book.subtitle && book.subtitle.length;

//对象检查自有属性

var o = {};
o.x = 1;
o.hasOwnProperty('x');
o.hasOwnProperty('toString');

//对象检查自有属性且可以枚举,继承

o.propertyIsEnumerable('x');
o.propertyIsEnumerable('toString');

//对象属性getter和setter

var o = {
    x: 1,
    y: 1,
    get r() {
        return this.x * this.y;
    },
    set r(value) {
        if (value == 0) throw '不能为0';
        return this.x * this.y * value;
    },
    get theta() {
        return this.x * this.y;
    }
};

//创建一个新的o对象
o.x = 2, o.y = 4;
console.log(o.r);
console.log(o.theta);

//获取对象的属性的特性
Object.getOwnPropertyDescriptor(o, 'x');
//Object {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(o, 'r');
//Object {enumerable: true, configurable: true}

//修改某个属性的特征
var o = {};
Object.defineProperty(o, 'zz', { value: 1, writable: true, enumerable: false, configurable: true });
Object.getOwnPropertyDescriptor(o, 'zz');
