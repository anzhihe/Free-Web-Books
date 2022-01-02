class Work{
    a:string;
    b:string;
}

interface IGoodWork extends Work{
    c:string;
}

let obj:IGoodWork = {
    a:'双休',
    b:'收入多',
    c:'工作轻松'
}

console.log(obj);
