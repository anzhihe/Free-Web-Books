function fn1(a:number):number{
    return a;
}
let f1 = fn1(100);

function fn2(a:any):any{
    console.log(a.length);
    return a;
}
let f2 = fn2('星星课堂');

function fn3<T>(a:T):T{
    return a;
}
let f3 = fn3<string>('星星课堂');
let f33 = fn3('xingxingclassroom');
let f333 = fn3(800);