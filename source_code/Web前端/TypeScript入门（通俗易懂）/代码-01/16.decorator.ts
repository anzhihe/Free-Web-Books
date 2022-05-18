/**
 * 类装饰器
 */
// 1.定义装饰器，其实就是一个函数
function decorator1(target){ // 对于类装饰器，接收一个参数
    // console.log(target); // 参数target表示当前类的构造函数
    // 为类扩展功能：添加属性和方法
    target.prototype.age = 19;
    target.prototype.print = function(){
        console.log('print方法');
    }
}

// 通过装饰器工厂来定义装饰器，可以传参
function decorator2(param:string){ // 这是装饰器工厂
    return function(target){ // 这是装饰器
        // console.log(target);
        // console.log(param); // 可以获取到使用装饰器时传递的参数
        target.prototype.msg = param;
    }
}

/**
 * 属性装饰器
 */
function decorator3(param){
    return function(target,property){ // 对于属性装饰器，可接收两个参数
        // console.log(target); // target表示当前类的原型对象
        // console.log(property); // property表示当前的属性名
        // console.log(param); 
        // 为属性扩展功能：为属性赋值
        target[property] = param;
    }
}

/**
 * 方法装饰器
 */
function decorator4(param){
    return function(target,method:string,descriptor){ // 对于方法装饰器，可接收三个参数
        // console.log(target); // target表示当前类的原型对象
        // console.log(method); // method表示当前的方法名
        // console.log(descriptor.value); // descriptor表示方法的描述符，value属性表示方法自身
        // 为方法扩展功能：让方法可以接收并输出传递的参数
        let oldMethod = descriptor.value;
        descriptor.value = function(...args:any[]){ // 重新定义方法
            oldMethod.call(this); // 调用原来的方法，此处的this表示调用方法的对象
            console.log(args);
        }
    }
}

// 2.使用装饰器
// @decorator1
@decorator2('world')
class Student{
    name:string = 'tom';

    @decorator3(16)
    age:number;

    show(){
        console.log('show方法');
    }

    @decorator4(666)
    print(){
        console.log('print方法');
    }
}

let stu:any = new Student();
// console.log(stu.name);
// stu.show();

// console.log(stu.age);
// stu.print();

// console.log(stu.msg);

// console.log(stu.age);

stu.print(1,2,3,4,5);