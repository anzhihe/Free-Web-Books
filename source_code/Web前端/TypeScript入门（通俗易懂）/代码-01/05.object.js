/**
 * 回顾一：JS中定义对象的几种方式
 *  优点：简单、方便
 *  缺点：只能描述一个对象的结构，无法为多个对象添加共享的原型功能
 * 
 */

/**
 * 方式1：对象字面量
 */ 
/* var stu1 = {
    name:'tom',
    age:18,
    study:function(){
        console.log('正在学习。。。。');
    }
}

// 没有原型，无法通过prototype添加共享功能
// stu1.prototype.show = function(){
//     console.log('自我介绍');
// }

var stu2 = {
    name:'alice',
    age:20
}

console.log(stu1.name,stu1.age);
stu1.study();
stu1.show(); */


/**
 * 方式2：构造函数/构造器
 *  优点：基于同一个构造函数创建对象，多个对象具有相同的结构，可以添加共享和原型功能
 *  缺点：无法为构造函数提供独立的作用域
 */
/* var data = 'hello'; // 全局作用域
function Student(name,age){
    this.name = name; // this表示将来new出来的当前对象
    this.age = age;
    this.study = function(){
        console.log('正在学习。。。。');
    }
}

// 通过原型的方式添加功能
Student.prototype.sex = 'male';
Student.prototype.show = function(){
    console.log('自我介绍：'+this.name+','+this.age+','+this.sex);
    console.log(data);
}

var stu1 = new Student('tom',18);
var stu2 = new Student('alice',20);
// console.log(stu1.name,stu1.age);
// stu1.study();
// console.log(stu2.name,stu2.age);
// stu2.study();
// console.log(stu1.sex,stu2.sex);
// stu1.show();
// stu2.show();

// 构造函数中的属性 和原型中的属性 有什么不同？
// stu1.name = 'aaa'; // 构造函数中的属性：每个实例都有独立的属性，互不影响
// console.log(stu1.name);
// console.log(stu2.name);
// stu1.sex = 'female'; // 为stu1添加一个实例属性sex，并不是修改原型中的属性
// stu1.__proto__.sex = 'female'; // 原型中的属性：所有实例所共享，访问的是同一个值
// console.log(stu1.sex);
// console.log(stu2.sex);

// data数据是全局的，并不是对象所独有
console.log(data); */


/**
 * 方式3：闭包构造函数
 *  通过自执行函数 (function(){})() 将构造函数烽原型定义包裹起来，构造一个独立作用域
 */
/* var Student = (function(){
    var data = 'hello'; // 全局作用域
    function Student(name,age){
        this.name = name; // this表示将来new出来的当前对象
        this.age = age;
        this.study = function(){
            console.log('正在学习。。。。');
        }
    }

    // 通过原型的方式添加功能
    Student.prototype.sex = 'male';
    Student.prototype.show = function(){
        console.log('自我介绍：'+this.name+','+this.age+','+this.sex);
        console.log(data);
    }

    return Student;
})();

var stu1 = new Student('tom',18);
var stu2 = new Student('alice',20);
stu1.show();
stu2.show(); */



/**
 * 回顾二：JS中实现继承的几种方式
 */
function Person(name,age){
    this.name = name;
    this.age = age;
    this.study = function(){
        console.log('正在学习。。。。。');
    }
}
Person.prototype.sex = 'male';
Person.prototype.show = function(){
    console.log('自我介绍。。。',this.name+','+this.age+','+this.sex);
}

/**
 * 方式1：对象冒充继承，也称为构造继承
 *  核心：使用call，以对象冒充的形式调用父类的构造函数，相当于是复制父类的实例属性给子类
 *  缺点：只能继承父类构造函数中的属性和方法，无法继承原型中的属性和方法
 */
/* function Student(name,age){
    Person.call(this,name,age); // 此时Person中的this指向的是Student的对象，所以称为对象冒充
}

var stu1 = new Student('tom',18); 
// 可以继承构造函数中的属性和方法
console.log(stu1.name,stu1.age);
stu1.study();
// 无法继承原型中的属性和方法
console.log(stu1.sex);
stu1.show(); */


/**
 * 方式2：原型链继承
 *  核心：使用prototype，将父类的对象作为子类的原型
 *  缺点：创建子类实例时，无法向父类构造函数传参，导致继承的父类属性没有值
 */
/* function Student(name,age){

}
Student.prototype = new Person(); // 将Student的原型指向Person实例，从而继承Person

var stu1 = new Student('tom',18);
console.log(stu1.name,stu1.age,stu1.sex);
stu1.study();
stu1.show(); */


/**
 * 方式3：组合继承：对象冒充+原型链
 */
function Student(name,age){
    Person.call(this,name,age);
}
// Student.prototype = new Person(); // 用法1：调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了），所以性能稍微差一点
Student.prototype = Person.prototype; // 用法2：完美

var stu1 = new Student('tom',18);
console.log(stu1.name,stu1.age,stu1.sex); 
stu1.study();
stu1.show();
