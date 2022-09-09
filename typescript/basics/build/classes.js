"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
console.log('===== CLASSES.JS OUTPUT =====');
var User = /** @class */ (function () {
    function User(name, hobby, email, age) {
        this.name = name;
        this.hobby = hobby;
        this.email = email;
        this.age = age;
        console.log('User created: ' + this.name);
    }
    User.prototype.register = function () {
        console.log(this.name + ' is now registered.');
    };
    User.prototype.payInvoice = function () {
        console.log(this.name + ' paid invoice.');
    };
    return User;
}());
var Member = /** @class */ (function (_super) {
    __extends(Member, _super);
    function Member(id, name, hobby, email, age) {
        var _this = _super.call(this, name, hobby, email, age) || this;
        _this.id = id;
        return _this;
    }
    return Member;
}(User));
var john = new User('John Doe', 'cooking', 'jdoe@gmail.com', 34);
var mike = new Member(1, 'Mike Smith', 'reading', 'mike@gmail.com', 42);
console.log(john.hobby);
console.log(mike.hobby);
mike.payInvoice();
