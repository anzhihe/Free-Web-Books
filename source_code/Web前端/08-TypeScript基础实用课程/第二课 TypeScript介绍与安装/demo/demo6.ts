function sum(a:number,b:number):number{
    return a + b;
}

console.log(sum(100,800));

let fn1 : (a:number,b:number) => void = function(x:number,y:number):void{
    console.log(x + y);
    // return x + y;
}

fn1(100,800);

function fn2(a:string,b?:number):void{
    console.log(a);
    if(b){
        console.log(b);
    }
}
fn2('星星课堂');

function fn3(a:number,b=800){
    console.log(a + b);
}

fn3(100);
