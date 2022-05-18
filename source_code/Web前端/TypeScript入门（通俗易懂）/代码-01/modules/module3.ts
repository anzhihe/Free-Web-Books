/**
 * 模块中包含命名空间
 */
namespace C{
    export let a:string = 'aaa';
}

namespace D{
    export let b:number = 12;
}

// 导出命名空间
export {
    C,D
}