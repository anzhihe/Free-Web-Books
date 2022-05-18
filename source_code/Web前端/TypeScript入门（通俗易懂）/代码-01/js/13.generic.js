"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 泛型
 *  实现功能：可以为学生类任意指定一个属性，一旦指定后则不能再修改属性的类型，但可以修改值
 */
// 普通类
var Student = /** @class */ (function () {
    function Student() {
    }
    return Student;
}());
// let student = new Student();
// student.field = 'tom';
// student.field = 18; // 可以任意赋值，缺乏类型安全
// 泛型类
var Stu = /** @class */ (function () {
    function Stu() {
    }
    return Stu;
}());
var stu = new Stu();
stu.field = 'tom';
// stu.field = 18; // 报错：只能赋值字符串，类型安全
var stu2 = new Stu();
stu2.field = 18;
var Mouse = /** @class */ (function () {
    function Mouse() {
    }
    Mouse.prototype.power = function (args) {
        throw new Error("Method not implemented.");
    };
    return Mouse;
}());
/**
 * 泛型函数
 */
function f1(args) {
    return args;
}
console.log(f1(6));
