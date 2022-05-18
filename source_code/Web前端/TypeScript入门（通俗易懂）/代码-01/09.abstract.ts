/**
 * 抽象类
 */
abstract class Pet{
    name:string;

    constructor(name:string){
        this.name = name;
    }

    show():void{
        console.log('我是一只宠物：'+this.name);
    }

    // 抽象方法
    abstract cry();
}

class Dog extends Pet{
    constructor(name:string){
        super(name);
    }

    cry(){
        console.log('旺旺旺。。。。');
    }
}

var dog = new Dog('旺财');
// var pet  = new Pet('宠物'); // 不能创建抽象类的实例