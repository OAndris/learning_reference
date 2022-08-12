/*
Promises were introduced in ES6, as the new way to handle asynchronous code (instead of the "callback hell").

A Promise is an object that promises that it will eventually have a value.
The value will be either a resolved value (in case of success) or a rejected value (in case of failure).
Ideal e.g. for making API calls (e.g. with 'fetch') and expecting a response, because we cannot be sure if it will be successful or not.
Any number of '.then()' methods can be chained together, each wraps the previously resolved Promise.
After the last '.then()', a '.catch()' is ideally used to catch any error (the rejected value of the Promise).

Sources of examples:
- https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15037608#overview
- "Google JavaScript Interview With A Frontend Engineer": https://www.youtube.com/watch?v=Rs7ARD5TCFU
*/

// =============================================================
// EXAMPLE 1
// =============================================================

const myPromise = new Promise((resolve, reject) => {
    const random = Math.round(Math.random() * 100) / 100;
    if (random > 0.5) {
        setTimeout(() => {
            resolve(`I have succeeded because ${random} > 0.5`);
        }, 1000);
    } else {
        reject(`I have failed because ${random} <= 0.5`);
    }
});

console.log(typeof myPromise);

myPromise
    .then((successValue) => successValue + ' !!!')
    .then((newValue) => console.log(newValue))
    .catch((rejectValue) => console.log(rejectValue));

// =============================================================
// EXAMPLE 2 - custom implementation of the Promise.all method
// =============================================================
function promiseAll(promises) {
    const outputs = [];
    let settledPromiseCounter = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((promise, i) => {
            promise
                .then((value) => {
                    outputs[i] = value;
                    settledPromiseCounter += 1;
                    if (settledPromiseCounter === promises.length) {
                        resolve(outputs);
                    }
                })
                .catch(reject);
        });
    });
}

const promises = [
    Promise.resolve(2),
    Promise.resolve(3),
    Promise.resolve(4),
    // Promise.reject('sorry'),
    new Promise((res) => setTimeout(() => res('done'), 200)),
    Promise.resolve('resolved'),
];
promiseAll(promises).then(console.log).catch(console.log);
