/**
 * 类的使用
 */
class Student{
    // 属性
    name:string;
    age:number;
    sex:string;

    // 构造函数/构造方法/构造器
    constructor(name:string,age:number,sex:string){
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    // 方法
    show(){
        console.log('自我介绍。。。'+this.name+','+this.age+','+this.sex);
    }

    calc(num1:number,num2:number):number{
        return num1+num2;
    }
}

// let stu1 = new Student();
// stu1.name = 'tom';
// stu1.age = 18;
// stu1.sex = 'male';
let stu1 = new Student('alice',20,'female'); // 自动调用构造方法
console.log(stu1.name);
stu1.show();
console.log(stu1.calc(3,5));

export {}