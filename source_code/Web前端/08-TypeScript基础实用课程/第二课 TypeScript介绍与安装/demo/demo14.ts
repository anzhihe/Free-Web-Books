interface IF1{
    fn1():void;
    fn2():void;
}

interface IF2{
    fn2():void;
    fn3():void;
}

let obj:IF1 | IF2 = {
    fn1(){},
    fn2(){},
    fn3(){}
}

obj.fn2();
