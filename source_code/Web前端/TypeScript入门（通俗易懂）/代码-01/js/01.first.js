"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ts是基于js的，所以在ts文件中可以直接使用js
 */
var str = 'hello';
var num = 2;
var PI = 3.1415926;
for (var i = 0; i < 5; i++) {
    console.log(i);
}
function show() {
    console.log('show函数');
}
// 支持ES6语法，在编译时会转换为ES5语法
var study = function () {
    console.log('print函数');
};
/**
 * 变量名冲突问题
 */
var name = 'tom'; // 默认情况下，无法使用变量名name等，与全局对象window的name属性出现了重名
var a = 6;
var b = 8;
