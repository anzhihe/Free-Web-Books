interface IBook{
    title?:string;
    num?:number;
}

let obj1:IBook = {
    title:'星星课堂'    
}

interface IConfig{
    title?:string;
    num?:number;
}

function configFn(config:IConfig){
    if(config.title){
        console.log(config.title);
    }
    if(config.num){
        console.log(config.num);
    }
}

configFn({num:100})

interface IBookReadonly{
    readonly bookId:number;
    title:string;
    num:number;
}

let obj2:IBookReadonly = {
    bookId:100,
    title:'xingxingclassroom',
    num:800
}
obj2.num = 900;
console.log(obj2);
