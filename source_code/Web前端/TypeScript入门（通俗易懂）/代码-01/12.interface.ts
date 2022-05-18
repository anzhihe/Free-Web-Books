/**
 * 接口，是一种规范标准，并不包含实现的部分
 */
interface Usb{
    weight:number;
    power():void;  // 具有供电的功能
}

class Mouse implements Usb{
    weight = 12.5;
    
    power(): void {
        console.log('这是鼠标，符合USB标准，重量：'+this.weight);
    }
}

class Fan implements Usb{
    weight = 3.6;

    power(): void{
        console.log('这是风扇，符合USB标准，重量：'+this.weight);
    }
}

let usb:Usb = new Mouse();
usb.power();

// new Usb(); // 不能创建接口的实例


/**
 * 使用接口表示函数类型，即通过接口对函数进行约束
 */
interface myFunction{ // 该接口用来描述一个函数类型
    (a:string,b:number):boolean // 函数的参数列表和返回值类型
}
// let f1:(a:string,b:number) => boolean;
let f1:myFunction; // 变量为函数类型
let f2:myFunction; // 可以对多个同类型的进行约束，实现复用
let f3:myFunction;
f1 = function(name:string,age:number){
    return true;
}

/**
 * 使用接口表示数组类型，即通过接口对数组进行约束
 */
interface myArray { // 该接口用来表示数组类型
    [index:number]:string // 数组的索引为number，值为string
}
let arr1:myArray;
let arr2:myArray;
arr1 = ['aaa','bbb'];

/**
 * 使用接口表示对象类型，即通过接口对对象进行约束
 */
interface myObject{ // 该接口用来描述一个对象类型
    name:string, // 必须属性
    age:number,
    address?:string // ?表示可选属性
}
function show(obj:myObject){
    console.log(obj);
}

var user = {
    name:'tom',
    age:18,
    address:'nanjing',
    password:'123'
}
show(user); // 传参时只要对象中包含必须属性即可

export {}