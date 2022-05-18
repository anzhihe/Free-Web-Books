/**
 * 导出模块，使用export
 */

// 方式1：在声明时导出
export var a = 5;

export var b = 8;

export function show(){
    console.log('show函数');
}

export class User{
    constructor(
        public name:string,
        public age:number
    ){}
}

var c = 12;

var print = function(){
    console.log('print函数');
}

//  方式2：在声明后，统一进行导出
export {
    c,print
}