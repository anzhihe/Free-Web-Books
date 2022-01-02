class Animal{
    public name:string;
    constructor(theName:string){
        this.name = theName;
    }
    move(distanceInMeters:number = 0){
        console.log(`${this.name}前进了${distanceInMeters}米`);
    }
}

class Fn1 extends Animal{
    getFn(){
        console.log('Fn1');
    }
}

class Cat extends Animal{
    constructor(name:string){
        super(name);
    }
    move(distanceInMeters:number = 100){
        console.log(this.name);
        console.log('Cat前进');
        super.move(distanceInMeters);
    }
}

let c1:Animal = new Cat('goodCat');
c1.move();
console.log(c1.name);

