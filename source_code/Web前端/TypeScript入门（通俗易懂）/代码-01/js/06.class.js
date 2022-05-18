"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 类的使用
 */
var Student = /** @class */ (function () {
    // 构造函数/构造方法/构造器
    function Student(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    // 方法
    Student.prototype.show = function () {
        console.log('自我介绍。。。' + this.name + ',' + this.age + ',' + this.sex);
    };
    Student.prototype.calc = function (num1, num2) {
        return num1 + num2;
    };
    return Student;
}());
// let stu1 = new Student();
// stu1.name = 'tom';
// stu1.age = 18;
// stu1.sex = 'male';
var stu1 = new Student('alice', 20, 'female'); // 自动调用构造方法
console.log(stu1.name);
stu1.show();
console.log(stu1.calc(3, 5));
