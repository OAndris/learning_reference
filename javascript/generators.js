/*
Generators in JavaScript are special functions, that can be used for asynchronous programming (better than callback hell; although using async await is even simpler).

They have the following differences when compared to regular functions:
- they are declared with the "function*" keyword
- the function body contains the "yield" keyword (which pauses execution and returns a value)
- when the generator function is called, it returns a generator object (instead of executing the whole function body and returning a value)
- the generator object's ".next()" method returns a value yield by the "yield" expression (the output is an object with the "value" and "done" properties)
- it is used, in effect, for exiting the function execution and later re-entering it (to continue execution from where it was exited)

More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
*/

function* whatever(num) {
    yield num;
    yield (num += 5);
    yield (num += 5);
    return (num += 5);
}

const myGenerator = whatever(5);
console.log(typeof whatever, whatever);
console.log(typeof myGenerator, myGenerator);
console.log(myGenerator.next());
console.log(myGenerator.next());
console.log(myGenerator.next());
console.log(myGenerator.next());
console.log(myGenerator.next());

function* haha(n) {
    for (let i = 0; i < n; i++) {
        yield i;
    }
}
const myGen = haha(3);
console.log('');
console.log(myGen.next());
console.log(myGen.next());
console.log(myGen.next());
console.log(myGen.next());
console.log(myGen.next());

function* infinite() {
    let index = 0;
    while (true) {
        yield index++;
    }
}
const generator = infinite();
console.log('');
console.log(generator.next());
console.log(generator.next());
