/*
This example demonstrates the 3 different ways (parallel, sequential, race) in which multiple Promises can be run.

Source of example: https://www.udemy.com/course/advanced-javascript-concepts/
*/

const promisify = (item, delay) => new Promise((resolve) => setTimeout(() => resolve(item), delay));

const a = () => promisify('a', 100);
const b = () => promisify('b', 5000);
const c = () => promisify('c', 3000);
console.log(a(), b(), c());

// "Parallel" running of multiple Promises:
async function parallel() {
    const promises = [a(), b(), c()];
    const [output1, output2, output3] = await Promise.all(promises);
    return `parallel is done: ${output1} ${output2} ${output3}`;
}
parallel().then(console.log);

// "Race" running of multiple Promises:
async function race() {
    const promises = [a(), b(), c()];
    const output1 = await Promise.race(promises);
    return `race is done: ${output1}`;
}
race().then(console.log);

// "Sequential" running of multiple Promises:
async function sequence() {
    const output1 = await a();
    const output2 = await b();
    const output3 = await c();
    return `sequence is done ${output1} ${output2} ${output3}`;
}
sequence().then(console.log);
