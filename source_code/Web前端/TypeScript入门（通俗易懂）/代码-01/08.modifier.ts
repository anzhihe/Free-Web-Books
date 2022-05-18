/**
 * 修饰符
 */
class Person{
    public name:string = 'tom';  // 默认就是public修饰符
    protected age:number = 18;
    private hobby:string = 'game';

    // 不允许直接访问该属性，命名上一般以下划线_开头
    private _sex:string = 'male';

    // 静态属性，属于整个类，并不属于某个实例所特有
    static address:string = '南京';

    show(){
        console.log(this.name);
        console.log(this.age);
        console.log(this.hobby);
    }

    public a(){
        console.log('aaa');
    }

    protected b(){
        console.log('bbb');
    }

    private c(){
        console.log('ccc');
    }

    /**
     * 提供get/set存取器，用来对属性进行访问
     */
    get sex(){
        console.log('获取_sex值');
        return this._sex.toUpperCase();
    }

    set sex(value){
        console.log('为_sex赋值');
        if(value=='male'||value=='female'){
            this._sex = value;
        }else{
            console.log('错误：性别只能为：male、female');
        }
    }
}

class Student extends Person {
    print(){
        console.log(this.name);
        console.log(this.age);
        // console.log(this.hobby); // 无法访问
    }
}

let p = new Person();
// p.show();
// console.log(p.name);
// console.log(p.sex); // 无法访问
// console.log(p.hobby); // 无法访问

/**
 * 封装
 */
// p._sex = '妖';
// p.sex = 'female';
// console.log(p.sex);


/**
 * 静态属性
 */
console.log(p.name);
// console.log(p.address); // 报错，不能通过 对象名.属性 访问
console.log(Person.address); // 静态属性要通过  类名.属性 访问

export {}