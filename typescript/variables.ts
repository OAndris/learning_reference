const variableTypesDemo = () => {
    // ====================
    // Type declarations for variables:
    // ====================
    let myString: string;
    let myNumber: number;
    let myBoolean: boolean;
    let myAny: any;

    let strArray: Array<string>; // same as string[]
    let numArray: Array<number>; // same as number[]
    let boolArray: Array<boolean>; // same as boolean[]

    let strNumTuple: [string, number];

    let myVoid: void = undefined;
    let myNull: null = null;
    let myUndefined: undefined = undefined;

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
