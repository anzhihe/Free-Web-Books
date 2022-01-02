let num:any = 100;
num = 'abc';

let arr:any[] = [100,'abc',false];
console.log(arr);

function fn1():void{
    console.log(123);
}

function fn2():never{
    throw new Error('错误');
}

fn2();
