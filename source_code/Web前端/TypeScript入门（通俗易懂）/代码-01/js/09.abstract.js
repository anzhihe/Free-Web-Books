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
 * 抽象类
 */
var Pet = /** @class */ (function () {
    function Pet(name) {
        this.name = name;
    }
    Pet.prototype.show = function () {
        console.log('我是一只宠物：' + this.name);
    };
    return Pet;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    Dog.prototype.cry = function () {
        console.log('旺旺旺。。。。');
    };
    return Dog;
}(Pet));
var dog = new Dog('旺财');
// var pet  = new Pet('宠物'); // 不能创建抽象类的实例
