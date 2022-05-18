/**
 * ts是基于js的，所以在ts文件中可以直接使用js
 */
var str = 'hello';
let num = 2;
const PI = 3.1415926;

for(let i=0; i<5; i++){
    console.log(i);
}

function show(){
    console.log('show函数');
}

// 支持ES6语法，在编译时会转换为ES5语法
let study = () => {
    console.log('print函数');
}


/**
 * 变量名冲突问题
 */
let name = 'tom'; // 默认情况下，无法使用变量名name等，与全局对象window的name属性出现了重名

export {}; // 解决：使用export将文件声明为一个模块module，变量被限制在当前模块作用域下，不会再产生冲突


var a = 6;
var b = 8;