type title = string;
let a:string = 'str';
let b:title = 'str';

type fn = () => number;
let f1: () => number = () => {
    return 200;
}
let f2:fn = () => {
    return 100;
}

type titleOrFn = title | fn;
function getTitleFn(arg:titleOrFn){
    if(typeof arg === 'string'){
        console.log(arg);
    }else{
        arg();
    }
}

type text = 'A' | 'B' | 'C' | 'D';
let str:text = 'C';
