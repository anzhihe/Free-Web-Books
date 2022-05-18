"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mouse = /** @class */ (function () {
    function Mouse() {
        this.weight = 12.5;
    }
    Mouse.prototype.power = function () {
        console.log('这是鼠标，符合USB标准，重量：' + this.weight);
    };
    return Mouse;
}());
var Fan = /** @class */ (function () {
    function Fan() {
        this.weight = 3.6;
    }
    Fan.prototype.power = function () {
        console.log('这是风扇，符合USB标准，重量：' + this.weight);
    };
    return Fan;
}());
var usb = new Mouse();
usb.power();
// let f1:(a:string,b:number) => boolean;
var f1; // 变量为函数类型
var f2; // 可以对多个同类型的进行约束，实现复用
var f3;
f1 = function (name, age) {
    return true;
};
var arr1;
var arr2;
arr1 = ['aaa', 'bbb'];
function show(obj) {
    console.log(obj);
}
var user = {
    name: 'tom',
    age: 18,
    address: 'nanjing',
    password: '123'
};
show(user); // 传参时只要对象中包含必须属性即可
