/*
Currying is the technique of translating the evaluation of a function that takes multiple arguments
into evaluating a sequence of functions, each with a single argument.

Currying is useful for creating multiple, reusable utility functions that remember the parameter with which they were created.
It's also highly useful for creating pipelines (with "compose" or "pipe"), which need a chain of functions, each having a single input (and a single output, that becomes the input of the next function in the chain)

Source of example code: https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15176902#overview
*/

// Standard version:
const multiply = (a, b) => a * b;

// Curried version:
const curriedMultiply = (a) => (b) => a * b;

//======================================

console.log(multiply(5, 3));
console.log(curriedMultiply(5)(3));

const curriedMultiplyBy5 = curriedMultiply(5);
console.log(curriedMultiplyBy5(3));
console.log(curriedMultiplyBy5(4));
