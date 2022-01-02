interface IConfig{
    title?:string;
    num?:number;
    [propName:string]:any
}

let obj:IConfig = {
    abc:123,
    cba:321,
    title:'title1'
}
