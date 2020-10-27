/*
Promises were introduced in ES6, as the new way to handle asynchronous code (instead of the "callback hell").

A Promise is an object that promises that it will eventually have a value.
The value will be either a resolved value (in case of success) or a rejected value (in case of failure).
Ideal for working making API calls (e.g. with 'fetch') and expecting a response, because we cannot be sure if it will be successful or not.
Any number of '.then()' methods can be chained together, each wraps the previously resolved Promise.
After the last '.then()', a '.catch()' is ideally used to catch any error (the rejected value of the Promise).

Source of example code: https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15037608#overview
*/

const myPromise = new Promise((resolve, reject) => {
    if (true) {
        setTimeout(() => {
            resolve('I have succeeded');
        }, 1000);
    } else {
        reject('I have failed');
    }
});

console.log(typeof myPromise);

myPromise
    .then((successValue) => successValue + '!!!')
    .then((newValue) => console.log(newValue))
    .catch((rejectValue) => console.log(rejectValue));
