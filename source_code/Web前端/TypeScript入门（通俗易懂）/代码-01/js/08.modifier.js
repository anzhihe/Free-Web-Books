"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 修饰符
 */
var Person = /** @class */ (function () {
    function Person() {
        this.name = 'tom'; // 默认就是public修饰符
        this.age = 18;
        this.hobby = 'game';
        // 不允许直接访问该属性，命名上一般以下划线_开头
        this._sex = 'male';
    }
    Person.prototype.show = function () {
        console.log(this.name);
        console.log(this.age);
        console.log(this.hobby);
    };
    Person.prototype.a = function () {
        console.log('aaa');
    };
    Person.prototype.b = function () {
        console.log('bbb');
    };
    Person.prototype.c = function () {
        console.log('ccc');
    };
    Object.defineProperty(Person.prototype, "sex", {
        /**
         * 提供get/set存取器，用来对属性进行访问
         */
        get: function () {
            console.log('获取_sex值');
            return this._sex.toUpperCase();
        },
        set: function (value) {
            console.log('为_sex赋值');
            if (value == 'male' || value == 'female') {
                this._sex = value;
            }
            else {
                console.log('错误：性别只能为：male、female');
            }
        },
        enumerable: false,
        configurable: true
    });
    // 静态属性，属于整个类，并不属于某个实例所特有
    Person.address = '南京';
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Student.prototype.print = function () {
        console.log(this.name);
        console.log(this.age);
        // console.log(this.hobby); // 无法访问
    };
    return Student;
}(Person));
var p = new Person();
// p.show();
// console.log(p.name);
// console.log(p.sex); // 无法访问
// console.log(p.hobby); // 无法访问
/**
 * 封装
 */
// p._sex = '妖';
// p.sex = 'female';
// console.log(p.sex);
/**
 * 静态属性
 */
console.log(p.name);
// console.log(p.address); // 报错，不能通过 对象名.属性 访问
console.log(Person.address); // 静态属性要通过  类名.属性 访问
