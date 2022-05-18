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
/**
 * 多态
 */
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.show = function () {
        console.log('我是一个人');
    };
    return Person;
}());
var Teacher = /** @class */ (function (_super) {
    __extends(Teacher, _super);
    function Teacher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 重写父类的方法 
    Teacher.prototype.show = function () {
        console.log('我叫' + this.name + '，我是一个老师');
    };
    // 子类特有的方法
    Teacher.prototype.teach = function () {
        console.log('我正在' + this.school + '进行教学。。。。');
    };
    return Teacher;
}(Person));
var Doctor = /** @class */ (function (_super) {
    __extends(Doctor, _super);
    function Doctor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Doctor.prototype.show = function () {
        console.log('我叫' + this.name + '，我是一个医生');
    };
    Doctor.prototype.operate = function () {
        console.log('我正在' + this.hospital + '做手术。。。');
    };
    return Doctor;
}(Person));
/**
 * 将父类的引用 指向 子类的对象
 */
// var p:Person = new Teacher();
// p.name = 'tom';
// p.show(); // 调用的是子类重写后的方法
// p.school = '南京大学'; // 无法访问子类特有的属性和方法
// p.teach();
// 1.使用类型断言的方式进行类型的指定
// (<Teacher>p).school = '南京大学';
// (<Teacher>p).teach();
// 2.先判断类型再调用
// if(p instanceof Teacher){
//     p.school = '南京大学';
//     p.teach();
// }
/**
 * 将父类作为方法形参，将子类的对象作为方法实参，从而实现多态
 */
function getPerson(p) {
    p.show();
    if (p instanceof Teacher) {
        p.teach();
    }
    else if (p instanceof Doctor) {
        p.operate();
    }
}
// let teacher = new Teacher();
// teacher.name='张三';
// teacher.school='南京大学';
// getPerson(teacher);
var doctor = new Doctor();
doctor.name = '李四';
doctor.hospital = '江苏人民医院';
getPerson(doctor);
