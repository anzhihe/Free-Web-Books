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
 * 继承
 */
// 父类
var Animal = /** @class */ (function () {
    function Animal(name, sex) {
        this.name = name;
        this.sex = sex;
    }
    Animal.prototype.cry = function () {
        console.log('俺是动物，俺能叫。。。。。');
    };
    return Animal;
}());
// 子类
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name, sex, hobby) {
        var _this = 
        // 在子类的构造函数中，必须使用super()调用父类构造函数
        _super.call(this, name, sex) || this;
        _this.hobby = hobby;
        return _this;
    }
    // 特有的方法
    Dog.prototype.swim = function () {
        console.log('狗狗在游泳。。。。');
    };
    // 重写父类中的cry()方法
    Dog.prototype.cry = function () {
        console.log('俺是狗，旺旺旺。。。。');
    };
    return Dog;
}(Animal));
// 子类
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name, sex, breed) {
        var _this = _super.call(this, name, sex) || this;
        _this.breed = breed;
        return _this;
    }
    // 特有的方法
    Cat.prototype.walk = function () {
        console.log('猫咪在走猫步。。。。');
    };
    Cat.prototype.cry = function () {
        console.log('俺是猫，喵喵喵。。。。');
    };
    return Cat;
}(Animal));
var dog = new Dog('旺财', '公', '接飞盘');
console.log(dog.name, dog.sex, dog.hobby);
dog.cry();
dog.swim();
var cat = new Cat('Hello Kitty', '母', '波斯猫');
console.log(cat.name, cat.sex, cat.breed);
cat.cry();
cat.walk();
