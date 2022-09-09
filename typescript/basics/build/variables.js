"use strict";
var variableTypesDemo = function () {
    // ====================
    // Type declarations for variables:
    // ====================
    var myString;
    var myNumber;
    var myBoolean;
    var myAny;
    var strArray; // same as string[]
    var numArray; // same as number[]
    var boolArray; // same as boolean[]
    var strNumTuple;
    var myVoid = undefined;
    var myNull = null;
    var myUndefined = undefined;
    // ====================
    // Value assignments:
    // ====================
    myString = 'Hello World'; // can only be string
    myNumber = 22;
    myBoolean = false;
    myAny = 5; // can be any type
    strArray = ['a', '2'];
    numArray = [1, 2];
    boolArray = [true, true, false, false, true];
    strNumTuple = ['Hello', 5];
    console.log('===== VARIABLES.JS OUTPUT =====');
    console.log(myString, myNumber, myBoolean, myAny, strArray);
};
variableTypesDemo();
