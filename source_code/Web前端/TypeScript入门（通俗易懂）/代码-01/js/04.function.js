"use strict";
/**
 * JS中的函数
 */
/* function f1(a,b){
    return a +b;
}

var f2 = function(a,b){ return a+b; }

var f3 = (a,b) => a+b; */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * TS中，为参数定义类型
 *      1.调用函数时参数的数量、类型必须一致
 *      2.未指定类型时，参数默认为any类型
 */
function f1(a, b, c, d) { }
// f1('hello',12,true);
// f1();
// f1('hello');
/**
 * 可选参数
 *  1.使用?号表示参数可选
 *  2.可选参数必须位于必选参数的后面
 */
function f2(a, b, c) { }
// f2('hello',12);
// f2('hello',12,true);
// f2('hello');
/**
 * 默认参数
 *  1.当未传递参数 或 值为undefined，会使用默认值
 */
function f3(a, b, c) {
    if (b === void 0) { b = 8; }
    console.log(a, b, c);
}
// f3('hello',12);
// f3(undefined,'hello');
// f3('hello',undefined,true);
/**
 * 剩余参数
 *  1.参数个数任意，可以有多个，也可以没有
 *  2.使用...定义剩余数据。类型为数组，会将传入的所有参数封装到该数组中
 */
function f5(a) {
    var b = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        b[_i - 1] = arguments[_i];
    }
    console.log(a);
    console.log(b);
}
// f5('hello',1,2,3,4,5);
/**
 * 为返回值定义类型
 *  1.在()后面指定返回值的类型
 *  2.当函数没有返回值时，指定为void
 */
function f6() {
    return "hello";
    // return 123;
}
function f7() {
    // return 123; // 不能返回结果
}
/**
 * 函数类型，包含两部分：参数类型、返回值类型
 */
// 定义一个变量f8，类型为函数，即创建一个函数类型的变量，函数的参数类型为string、number，返回值类型为boolean
// let f8:(a:string,b:number) => boolean;
// 为变量赋值一个同类型的函数
// f8 = function(a:string,b:number):boolean{
//     console.log(a,b);
//     return true;
// }
var f8 = function (a, b) {
    console.log(a, b);
    return true;
};
console.log(f8('hello', 12));
