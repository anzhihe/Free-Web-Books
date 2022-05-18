"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 数据类型
 */
// 1.字符串 string
var name = '汤姆';
var sex = "male";
var msg = "\u59D3\u540D\uFF1A" + name + "\uFF0C\u6027\u522B\uFF1A" + sex; // TypeScript对模板字符串里的中文进行编译时会转换为unicode编码
// console.log(msg);
// 2.数值 number
var age = 20;
var height = 180.5;
// 3.布尔 boolean
var flag = true;
// 4.数组 Array
// 方式1：在数据类型后面加[]
var names = ['tom', 'jack', 'alice'];
names[0] = '汤姆';
// names[0] = 18; // 数据中元素类型必须相同
// 方式2：使用数组泛型，Array<数据类型>
var nums = [12, 4, 1, 54];
// 5.null 和 undefined
// let address:null = null; // 一般不会这样做，没意义
// let address:undefined = undefined;
// 默认情况下null和undefined是所有类型的子类型，可以将null和undefined赋值给其他类型
var address = null; // 需要关闭严格类型检查，strict:false
var num = undefined;
// 6.元组，实际上就是特殊的数组，特点：元素数量和类型固定，但各元素的类型可以不同
// names[names.length] = 'mike';
// console.log(names);
var tuple = ['tom', 20, false]; // 只能定义三个元素，第一个为string类型，第二个为number类型，第三个为boolean类型 
// tuple[0] = '汤姆';
// tuple[0] = 8; // 每个元素的类型固定
// tuple[tuple.length] = 'mike';  // 长度固定，无法扩展
// console.log(tuple);
// 7.枚举 enum，用来限制可取值的范围，名称更友好，且有提示
var Season;
(function (Season) {
    Season["spring"] = "\u6625";
    Season["summer"] = "\u590F";
    Season["autumn"] = "\u79CB";
    Season["winter"] = "\u51AC";
})(Season || (Season = {}));
var s = Season.summer;
console.log(s);
// 8.任意类型 any，当暂时不确定变量类型时可以使用
var a;
a = 'hello';
a = 12;
a = false;
var b = ['hello', 12, false]; // 数组中元素为任意类型
b[0] = 2;
// 9.空类型 void，取值只能为：null 或 undefined
var c = null; // 一般不会将变量声明为void，没意义
// 通常当函数没有返回值时，会声明返回值类型为void
function show() {
    console.log(111);
}
// 10.never 表示的是那些永不存在的值的类型
function test() {
    while (true) {
    }
}
// 11.object 表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
var d = [1, 2, 3];
d = { name: 'tom', age: 18 };
d = new Date();
// d = 'hello';
// d = 19;
// 13.联合类型，表示一个值可以是几种类型之一，使用|定义
var e = 'hello';
e = 12;
// e = false;
e = null;
/**
 * 类型断言：用来指定变量的类型，其实就是做个断定/假设，使编译器通过，只在编译阶段起作用
 *    两种方式：
 *      1.使用尖括号，语法：<类型>值
 *      2.使用as，语法：值 as 类型
 */
var f;
f = 'hello';
// 获取变量f的长度
if (f.length) { // 断言f为字符串类型
    // console.log((<string>f).length); // 调用字符串的length属性获取长度
    console.log(f.length);
}
else {
    console.log(f.toString().length);
}
