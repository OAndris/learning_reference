/*
Functional Programming (FP)

A few of the related terms and concepts:
- Immutability
- Pure functions (no side effects; predictability)
- Separation of data and functions
- Single source of truth
- Declarative programming
- First-class functions
- Higher-order functions (HOC)
- Compose & Pipe

Benefits:
- Readability
- Maintainability
- Reusability
- Testability

Source of example: https://www.udemy.com/course/advanced-javascript-concepts/
*/

function combineFunctions(...fns) {
    const pipe = (f, g) => (...args) => g(f(...args));
    // const compose = (f, g) => (...args) => f(g(...args));
    return fns.reduce(pipe);
}
