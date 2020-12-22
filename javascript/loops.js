/*
Example functions demonstrating loops in JavaScript:
- for
- for in
- for of
- while
- do while

And some related Array methods:
- Array.forEach
- Array.map

And keywords that can be used in loops:
- continue (continue to the next iteration, skipping the rest of the current iteration)
- break (break out of the current loop)
- return (return from the current function)

Sources:
- https://www.linkedin.com/learning/javascript-essential-training-3/break-and-continue-loops
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
- https://www.w3schools.com/js/js_loop_for.asp
*/

function forExample() {
    // Repeat executing a statement for as long as the specified condition evaluates to true.
    console.log('FOR LOOP');
    for (let step = 0; step < 5; step++) {
        console.log(step);
    }
}

function forInExample() {
    // Iterate over the properties of an object (shouldn't be used with arrays - it would normally return its numeric indexes, but also any user-defined properties, if the array was modified in such a way)
    console.log('FOR IN LOOP');
    const obj = {
        A: 1,
        B: 2,
    };
    for (let property in obj) {
        console.log(property);
    }
}

function forOfExample() {
    // Iterate over the iterable objects (including Array, Map, Set, arguments)
    console.log('FOR OF LOOP');
    const arr = [3, 5, 7];
    for (let element of arr) {
        console.log(element);
    }
}

function whileExample() {
    // Repeat executing a statement for as long as the specified condition evaluates to true.
    console.log('WHILE LOOP');
    let i = 0;
    while (i < 5) {
        i += 1;
        console.log(i);
    }
}

function doWhileExample() {
    // Execute a statement and then repeat it for as long as the specified condition evaluates to true.
    console.log('DO WHILE LOOP');
    let i = 0;
    do {
        i += 1;
        console.log(i);
    } while (i < 5);
}

function arrayForEachExample() {
    // Array method for executing a provided function once for each array element.
    console.log('ARRAY.FOREACH EXAMPLE');
    const arr = [3, 5, 7];
    arr.forEach((element) => console.log(element));
}

function arrayMapExample() {
    // Array method for creating a new array populated with the results of a callback function called on every element in the calling array.
    console.log('ARRAY.MAP EXAMPLE');
    const arr = [3, 5, 7];
    const newArr = arr.map((element) => 2 * element);
    console.log(newArr);
}

forExample();
forInExample();
forOfExample();
whileExample();
doWhileExample();
arrayForEachExample();
arrayMapExample();

//=================================

function chance() {
    const MIN = 0;
    const MAX = 36;
    let testNumber = 15;
    let i = 1;
    console.log(`Searched number: ${testNumber}`);
    while (MAX > i) {
        let randomValue = Math.floor(Math.random() * (MAX - MIN)) + MIN;
        console.log(`Round ${i}: ${randomValue}`);
        if (randomValue === testNumber) {
            break;
        }
        i++;
    }
}

function prime() {
    const CEILING = 100;

    function primeTest(testValue) {
        let isPrime = true;
        for (let i = 2; i < testValue; i++) {
            if (testValue % i === 0) {
                isPrime = false;
            }
        }
        return isPrime;
    }

    for (let i = 2; i <= CEILING; i++) {
        let result = primeTest(i);
        if (result === false) {
            continue;
        }
        console.log(`${i} is a prime number!`);
    }
}

// chance();
// prime();
