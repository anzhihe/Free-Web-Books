"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 通过构造函数和属性修饰符，简化属性的定义
 */
var Student = /** @class */ (function () {
    /* id:number;
    name:string;
    age:number;
    sex:string;

    constructor(id:number,name:string,age:number,sex:string){
        this.id = id;
        this.name = name;
        this.age = age;
        this.sex = sex;
    } */
    // 简写：为构造函数的参数添加public修饰符
    function Student(id, name, age, sex) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    return Student;
}());
var stu = new Student(1001, 'tom', 20, 'male');
console.log(stu);
