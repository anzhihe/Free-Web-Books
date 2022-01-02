function fn1(a:string,...argsArr:number[]){
    console.log(a);
    console.log(argsArr);
}

fn1('星星课堂',100,800);

let fn2:(fa:string,...argsArrFa:number[]) => void = fn1;
fn2('xingxingclassroom',100,800);
