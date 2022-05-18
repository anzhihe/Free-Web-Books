"use strict";
/**
 * 导出模块，使用export
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = exports.c = exports.User = exports.show = exports.b = exports.a = void 0;
// 方式1：在声明时导出
exports.a = 5;
exports.b = 8;
function show() {
    console.log('show函数');
}
exports.show = show;
var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
    }
    return User;
}());
exports.User = User;
var c = 12;
exports.c = c;
var print = function () {
    console.log('print函数');
};
exports.print = print;
