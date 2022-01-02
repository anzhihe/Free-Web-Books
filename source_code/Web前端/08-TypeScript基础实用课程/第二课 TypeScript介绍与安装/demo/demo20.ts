class Book{
    saleFn(price:number){
        console.log(`书的价格是${price}元`);
    }
}

class Fiction extends Book{
    getStarFn(num:number = 0){
        console.log(`小说的评分是${num}分`);
    }
}

let f1 = new Fiction();
f1.saleFn(188);
f1.getStarFn(100);
