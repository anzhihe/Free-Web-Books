var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * 类装饰器
 */
// 1.定义装饰器，其实就是一个函数
function decorator1(target) {
    // console.log(target); // 参数target表示当前类的构造函数
    // 为类扩展功能：添加属性和方法
    target.prototype.age = 19;
    target.prototype.print = function () {
        console.log('print方法');
    };
}
// 通过装饰器工厂来定义装饰器，可以传参
function decorator2(param) {
    return function (target) {
        // console.log(target);
        // console.log(param); // 可以获取到使用装饰器时传递的参数
        target.prototype.msg = param;
    };
}
/**
 * 属性装饰器
 */
function decorator3(param) {
    return function (target, property) {
        // console.log(target); // target表示当前类的原型对象
        // console.log(property); // property表示当前的属性名
        // console.log(param); 
        // 为属性扩展功能：为属性赋值
        target[property] = param;
    };
}
/**
 * 方法装饰器
 */
function decorator4(param) {
    return function (target, method, descriptor) {
        // console.log(target); // target表示当前类的原型对象
        // console.log(method); // method表示当前的方法名
        // console.log(descriptor.value); // descriptor表示方法的描述符，value属性表示方法自身
        // 为方法扩展功能：让方法可以接收并输出传递的参数
        var oldMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            oldMethod.call(this); // 调用原来的方法，此处的this表示调用方法的对象
            console.log(args);
        };
    };
}
// 2.使用装饰器
// @decorator1
var Student = /** @class */ (function () {
    function Student() {
        this.name = 'tom';
    }
    Student.prototype.show = function () {
        console.log('show方法');
    };
    Student.prototype.print = function () {
        console.log('print方法');
    };
    __decorate([
        decorator3(16)
    ], Student.prototype, "age", void 0);
    __decorate([
        decorator4(666)
    ], Student.prototype, "print", null);
    Student = __decorate([
        decorator2('world')
    ], Student);
    return Student;
}());
var stu = new Student();
// console.log(stu.name);
// stu.show();
// console.log(stu.age);
// stu.print();
// console.log(stu.msg);
// console.log(stu.age);
stu.print(1, 2, 3, 4, 5);
