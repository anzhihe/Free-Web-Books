/**
 * 导入模块，使用import
 */
import {a,show,User,c,print} from './modules/module1' // 后缀名可以省略

console.log(a);
// console.log(b);

show();

var user = new User('tom',20);
console.log(user);

console.log(c);
print();


/**
 * 导入默认成员
 *  此时不需要大括号，且名称自定义
 */
import data from './modules/module2'
console.log(data.name);
data.show();