interface IWork{
    technology:string;
}

interface IHobby{
    game:string;
}

interface IProgrammer extends IWork,IHobby{
    language:string;
    income:number;
    game:string;
}

let obj:IProgrammer = {
    technology:'程序开发技术',
    game:'英雄联盟',
    language:'js',
    income:20000
}
