/*
Example based on "Frontend Interview Experience (Unacademy) - Javascript and React JS Interview Questions" by RoadsideCoder (https://www.youtube.com/watch?v=abbdJ4Yfm54)
*/

const pipe = (...functions) => {
    return (input) => functions.reduce((arg, fn) => fn(arg), input);
};

const compose = (...functions) => {
    return (input) => functions.reduceRight((arg, fn) => fn(arg), input);
};

const evaluateWithPipe = pipe(addFive, subtractTwo, multiplyFour); // "pipe" evaluates from left to right
const evaluateWithCompose = compose(addFive, subtractTwo, multiplyFour); // "compose" evaluates from right to left

console.log(evaluateWithPipe(5)); // (5 + 5 - 2) * 4 === 32
console.log(evaluateWithCompose(5)); // 5 * 4 - 2 + 5 === 23

// ===============================
function subtractTwo(a) {
    return a - 2;
}
function multiplyFour(a) {
    return a * 4;
}
function addFive(a) {
    return a + 5;
}
// ===============================
