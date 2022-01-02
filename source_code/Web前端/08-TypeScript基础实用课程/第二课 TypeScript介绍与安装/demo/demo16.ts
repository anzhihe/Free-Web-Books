type objNum = {
    num:number
};

interface INum{
    num:number;
}

let fn1 = (arg:objNum) => {
    console.log(arg);
}

let fn2 = (arg:INum) => {
    console.log(arg);
}
