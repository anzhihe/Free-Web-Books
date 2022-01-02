interface IFn{
    (a:number,b:number):boolean
}

let fn1:IFn = (x:number,y:number) => {
    return x > y;
}

fn1(100,200);
