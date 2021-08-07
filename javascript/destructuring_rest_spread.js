/*
"Destructuring" makes it easier to obtain and directly assign values (from arrays) and/or properties (from objects) to variables.

Definition From MDN: "The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables."
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

The "rest parameters" and "spread operator" are also related terms:
- "The rest parameter syntax allows a function to accept an indefinite number of arguments as an array, providing a way to represent variadic functions in JavaScript." (source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- "Spread syntax (...) allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected." (source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
*/

const arrayDestructuringDemo = () => {
    console.log('*********** ARRAY DESTRUCTURING ***********');

    const arr = ['aa', 'bb', 'cc', 1];

    // Save values directly to new variables (instead of "const a = arr[0];"):
    const [a, b, c, d] = arr;
    console.log(a, b, c, d); // a === 'aa', and so on

    // Destructuring only the first N values is also possible (and the variable names can be chosen arbitrarily):
    const [x, y] = arr;
    console.log(x, y);

    // The "rest parameters" allows us to deal with any (potentially unknown) number of array elements during destructuring:
    const [aa, bb, ...rest] = arr;
    console.log(aa, bb, rest); // the variable "rest" is now an array containing the remaining values from the destructured array "arr"

    // Array destructuring can also be used for creating a copy:
    const newArray = [...arr];
    console.log(newArray);

    // Additionally, "rest parameters" also allow us to deal with any number of input parameters in function declarations:
    const sum = (...theArgs) => {
        return theArgs.reduce((previous, current) => {
            return previous + current;
        });
    };
    console.log(sum(1, 2, 3));
    console.log(sum(1, 2, 3, 4, 5));
};
arrayDestructuringDemo();

const objectDestructuringDemo = () => {
    console.log('\n*********** OBJECT DESTRUCTURING ***********');

    // Save values directly to new variables (instead of "const a = obj[0];"):
    const obj1 = { a: 1, b: 2, c: 3 };
    const { a, b, c } = obj1;
    console.log(a, b, c);

    // Destructuring only a number of specified properties is also possible:
    const obj2 = { x: 'a', y: 'b', z: 'c' };
    const { y } = obj2;
    console.log(y);

    // Destructuring from nested objects is also possible:
    const nestedObj = { xx: 'a', yy: 'b', zz: { aa: 1, bb: 2, cc: 3 } };
    const {
        zz,
        zz: { aa, cc },
    } = nestedObj;
    console.log(zz);
    console.log(aa, cc);

    // Object destructuring can also be used for creating a copy:
    const copiedObj = { ...nestedObj };
    console.log(copiedObj);
    copiedObj['zz'] = { x: 1 };
    console.log(copiedObj);
    console.log(nestedObj);

    // The new object can also be extended with new property-value pairs during creation:
    const newObj = {
        ...nestedObj,
        a: 1,
    };
    console.log(newObj);
};
objectDestructuringDemo();
