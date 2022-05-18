/**
 * 继承
 */
// 父类
class Animal{
    name:string;
    sex:string;

    constructor(name:string,sex:string){
        this.name = name;
        this.sex = sex;
    }

    cry(){
        console.log('俺是动物，俺能叫。。。。。');
    }
}

// 子类
class Dog extends Animal{
    // 特有的属性
    hobby:string;

    constructor(name:string,sex:string,hobby:string){
        // 在子类的构造函数中，必须使用super()调用父类构造函数
        super(name,sex); // super()的调用必须位于this调用之前
        this.hobby = hobby;
    }

    // 特有的方法
    swim(){
        console.log('狗狗在游泳。。。。');
    }

    // 重写父类中的cry()方法
    cry(){
        console.log('俺是狗，旺旺旺。。。。');
    }    
}

// 子类
class Cat extends Animal{
    breed:string;

    constructor(name:string,sex:string,breed:string){
        super(name,sex);
        this.breed = breed;
    }

    // 特有的方法
    walk(){
        console.log('猫咪在走猫步。。。。');
    }

    cry(){
        console.log('俺是猫，喵喵喵。。。。');
    }
}

var dog = new Dog('旺财','公','接飞盘');
console.log(dog.name,dog.sex,dog.hobby);
dog.cry();
dog.swim();

var cat  = new Cat('Hello Kitty','母','波斯猫');
console.log(cat.name,cat.sex,cat.breed);
cat.cry();
cat.walk();

export {}