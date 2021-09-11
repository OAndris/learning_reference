/*
Functional Programming (FP)
JavaScript is a multi-paradigm (not strictly functional) programming language, but FP concepts can be followed.

Benefits:
- Readability
- Maintainability
- Reusability
- Testability

A few of the related terms and concepts:
- Separation of data and functions
- Declarative programming
- Single source of truth
- Immutability:
    - otherwise mutable variables, like objects and arrays, shouldn't be modified directly
    - instead, mutable variables should be copied (with a new reference) and then the copy can be modified
    - shallow copies of objects can be created using the spread operator (alternatively, with Object.assign)
    - deep copies are created by nested spread operators, or using immutability libraries (e.g. Immutable, Immer, Mori)
    - benefits: predictability, concurrency (benefits come at the cost of some performance and memory overhead)
- Pure functions:
    - predictability of always returning the same output for the same input, and making no side effects
    - this excludes the usage of random values, current datetime, and global state within the function
    - benefits:
        - predictability
        - self-documenting
        - easy testing (no need for setting up external dependencies)
        - allows concurrency
        - cacheable (if the inputs haven't changed, the results can be read from a cache - it is called "memoization")
- First-class functions (functions are just like any other object: they can be saved to variables, and can be inputs to and/or outputs of other functions)
- Higher-order functions (functions that take another function as input and/or return another function as output)
- Compose & Pipe (for creating a pipeline, which is just a chain of function calls, each having a single input and a single output, the latter automatically becoming an input of the next function in the chain)
- Currying (a technique for transforming a function with multiple inputs to a sequence of functions, each having a single input - it's highly useful for creating pipelines)
- Memoization (storing the results of pure function calls, to enable avoiding repeated function calls and instead reading it from the cache if the function is called again with the same inputs)


Source of example: https://www.udemy.com/course/advanced-javascript-concepts/
*/

//=====================================================
// Data
//=====================================================
const user = {
    name: 'Kim',
    active: true,
    cart: [],
    purchases: [],
};

const item = {
    name: 'laptop',
    price: 200,
};

let log = [];

//=====================================================
// Individual functions
//=====================================================
function addItemToCart(user, item) {
    log.push(user);
    log.push('Add item to cart');
    const updatedCart = user.cart.concat(item);
    return Object.assign({}, user, { cart: updatedCart });
}

function applyTaxToItems(user) {
    log.push(user);
    log.push('Apply tax to items');
    const { cart } = user;
    const taxRate = 1.3;
    const updatedCart = cart.map((item) => {
        return {
            name: item.name,
            price: item.price * taxRate,
        };
    });
    return Object.assign({}, user, { cart: updatedCart });
}

function buyItem(user) {
    log.push(user);
    log.push('Buy item');
    return Object.assign({}, user, { purchases: user.cart });
}

function emptyCart(user) {
    log.push(user);
    log.push('Empty the cart');
    return Object.assign({}, user, { cart: [] });
}

//=====================================================
// Combined functions
//=====================================================

// The traditional way:
function purchaseItemTraditional(user, item) {
    log.push('Purchase item initiated.');
    let newUser;
    newUser = addItemToCart(user, item);
    newUser = applyTaxToItems(newUser);
    newUser = buyItem(newUser);
    newUser = emptyCart(newUser);
    log.push(newUser);
    log.push('Purchase item completed.');
    return newUser;
}

// With "compose" or "pipe":
function compose(...fns) {
    return fns.reduce(
        (f, g) =>
            (...args) =>
                f(g(...args))
    );
}

function pipe(...fns) {
    return fns.reduce(
        (f, g) =>
            (...args) =>
                g(f(...args))
    );
}

function purchaseItemWithPipe(user, item) {
    // Same as "purchaseItemTraditional" but using "pipe" to chain the functions
    log.push('Purchase item initiated.');
    const newUser = pipe(addItemToCart, applyTaxToItems, buyItem, emptyCart)(user, item);
    log.push(newUser);
    log.push('Purchase item completed.');
    return newUser;
}

//=====================================================
console.log('Initial log:');
console.log(log);
console.log('Purchase in traditional way:');
purchaseItemTraditional(user, item);
console.log(log);
console.log('');

log = [];
console.log('Reseted log:');
console.log(log);
console.log('Purchase with pipe:');
purchaseItemWithPipe(user, item);
console.log(log);
