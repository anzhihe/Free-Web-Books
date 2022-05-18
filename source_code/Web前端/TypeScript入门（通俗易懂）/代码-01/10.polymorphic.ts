/**
 * 多态
 */
abstract class Person{
    name:string;

    show():void{
        console.log('我是一个人');
    }
}

class Teacher extends  Person{
    school:string; // 所在学校

    // 重写父类的方法 
    show():void{
        console.log('我叫'+this.name+'，我是一个老师');
    }

    // 子类特有的方法
    teach():void{
        console.log('我正在'+this.school+'进行教学。。。。');
    }
}

class Doctor extends Person{
    hospital:string; // 所在医院

    show():void{
        console.log('我叫'+this.name+'，我是一个医生');
    }

    operate():void{
        console.log('我正在'+this.hospital+'做手术。。。');
    }
}

/**
 * 将父类的引用 指向 子类的对象
 */ 
// var p:Person = new Teacher();
// p.name = 'tom';
// p.show(); // 调用的是子类重写后的方法
// p.school = '南京大学'; // 无法访问子类特有的属性和方法
// p.teach();

// 1.使用类型断言的方式进行类型的指定
// (<Teacher>p).school = '南京大学';
// (<Teacher>p).teach();

// 2.先判断类型再调用
// if(p instanceof Teacher){
//     p.school = '南京大学';
//     p.teach();
// }


/**
 * 将父类作为方法形参，将子类的对象作为方法实参，从而实现多态
 */
function getPerson(p:Person){
    p.show();
    if(p instanceof Teacher){
        p.teach();
    }else if (p instanceof Doctor){
        p.operate();
    }
}

// let teacher = new Teacher();
// teacher.name='张三';
// teacher.school='南京大学';
// getPerson(teacher);

let doctor = new Doctor();
doctor.name='李四';
doctor.hospital='江苏人民医院';
getPerson(doctor);