"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 命名空间
 */
var A;
(function (A) {
    // 命名空间中的成员需要导出才能被外部访问
    A.msg = 'hello';
    var Student = /** @class */ (function () {
        function Student(username, password) {
            this.username = username;
            this.password = password;
        }
        return Student;
    }());
    A.Student = Student;
})(A || (A = {}));
var B;
(function (B) {
    B.msg = 'world';
    var Student = /** @class */ (function () {
        function Student(id, name) {
            this.id = id;
            this.name = name;
        }
        return Student;
    }());
})(B || (B = {}));
// 访问命名空间中的成员时，需要添加命名空间名称作为前缀
console.log(A.msg);
console.log(B.msg);
var stu1 = new A.Student('admin', '123');
var module3_1 = require("./modules/module3");
console.log(module3_1.C.a);
