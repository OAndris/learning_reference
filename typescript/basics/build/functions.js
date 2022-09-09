"use strict";
var functionsDemo = function () {
    // Ensuring numeric inputs and numeric output:
    function getSum(num1, num2) {
        return num1 + num2;
    }
    // Ensuring no specific input type, but numeric output:
    var mySum = function (num1, num2) {
        if (typeof num1 === 'string') {
            num1 = parseInt(num1);
        }
        if (typeof num2 === 'string') {
            num2 = parseInt(num2);
        }
        return num1 + num2;
    };
    // Ensuring string inputs and output, and making a parameter OPTIONAL
    var getName = function (firstName, lastName) {
        return lastName === undefined ? firstName : firstName + " " + lastName;
    };
    // Ensuring no output:
    var myVoid = function (myString) {
        console.log(myString);
    };
    console.log('===== FUNCTIONS.JS OUTPUT =====');
    console.log(getSum(1, 4));
    console.log(mySum('3', 5));
    console.log(getName('John'));
    console.log(getName('John', 'Doe'));
    myVoid('Void function, having no output');
};
functionsDemo();
