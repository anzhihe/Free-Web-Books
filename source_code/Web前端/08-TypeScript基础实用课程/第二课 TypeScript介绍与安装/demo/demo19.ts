class Fn1{
    num:number;
    constructor(num:number){
        this.num = num;
    }
    getNumFn(){
        return this.num;
    }
}

let f1 = new Fn1(100);
console.log(f1.getNumFn());
