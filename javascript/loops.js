/*
Example functions demonstrating loops in JavaScript:
- while
- for

And keywords:
- continue
- break
- return

TODO:
- for in
- for of
- forEach
- do while

Sources:
- https://www.linkedin.com/learning/javascript-essential-training-3/break-and-continue-loops
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
- https://www.w3schools.com/js/js_loop_for.asp
*/

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

chance();
prime();
