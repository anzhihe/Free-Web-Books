/**
 * 泛型
 *  实现功能：可以为学生类任意指定一个属性，一旦指定后则不能再修改属性的类型，但可以修改值
 */
// 普通类
class Student{
    field:any; // any缺乏类型安全
}
// let student = new Student();
// student.field = 'tom';
// student.field = 18; // 可以任意赋值，缺乏类型安全

// 泛型类
class Stu<T>{ // T表示一种类型，但暂时不知道具体的类型，称为参数化类型，在使用该类时需要指定具体的类型
    field:T;
}
let stu = new Stu<string>();
stu.field = 'tom';
// stu.field = 18; // 报错：只能赋值字符串，类型安全

let stu2 = new Stu<number>();
stu2.field = 18;
// stu2.field = 'alice';

// let stu3:Stu<string> = new Stu<string>();
// let nums:Array<string> = ['aaa','bbb','ccc'];

/**
 * 泛型接口
 */
interface Usb<T>{
    power(args:T):boolean;
}

class Mouse implements Usb<number>{
    power(args: number): boolean {
        throw new Error("Method not implemented.");
    }
}

/**
 * 泛型函数
 */
function f1<T>(args:T):T{
    return args;
}

console.log(f1<number>(6));

export {}