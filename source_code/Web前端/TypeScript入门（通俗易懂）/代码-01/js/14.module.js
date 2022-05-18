"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 导入模块，使用import
 */
var module1_1 = require("./modules/module1"); // 后缀名可以省略
console.log(module1_1.a);
// console.log(b);
module1_1.show();
var user = new module1_1.User('tom', 20);
console.log(user);
console.log(module1_1.c);
module1_1.print();
/**
 * 导入默认成员
 *  此时不需要大括号，且名称自定义
 */
var module2_1 = __importDefault(require("./modules/module2"));
console.log(module2_1.default.name);
module2_1.default.show();
