/*
Examples for the various function declaration types in JavaScript.
- Regular function syntax vs. Arrow function syntax

TODO:
- Named functions vs. Anonymous functions
- Immediately Invoked Function Expressions (IIFE)
- Use cases - when to use what
*/

function regularFunction(a, b) {
    console.log(`Do something with ${a} and ${b}`);
}

const arrowFunction = (a, b) => {
    console.log(`Do something with ${a} and ${b}`);
};

regularFunction(5, 10);
arrowFunction(7, 3);
