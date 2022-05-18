/**
 * 命名空间
 */
namespace A{
    // 命名空间中的成员需要导出才能被外部访问
    export let msg:string = 'hello';

    export class Student{
        constructor(
            public username:string,
            public password:string
        ){}
    }
}

namespace B{
    export let msg:string = 'world';

    class Student{
        constructor(
            public id:number,
            public name:string
        ){}
    }
}

// 访问命名空间中的成员时，需要添加命名空间名称作为前缀
console.log(A.msg);
console.log(B.msg);

var stu1 = new A.Student('admin','123');

import {C,D} from './modules/module3'
console.log(C.a);