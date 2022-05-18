"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 变量
 */
// 1.定义变量时需要指定变量的类型
var a = 'hello';
a = 'world';
// a = 8; // 报错，不能改变变量的类型
// 2.如果定义变量时未指定类型，而是直接赋值，则以初次赋值时的数据类型作为变量的类型
var b = 12;
b = 8;
// b = 'welcome';  // 报错
// 3.如果定义变量时未指定类型，也没有赋值，则变量的类型为 any，即任意类型
var c;
c = 12;
c = 'welcome';
c = true;
