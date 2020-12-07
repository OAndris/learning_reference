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

const log = [];

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
function combineFunctions(...fns) {
    const pipe = (f, g) => (...args) => g(f(...args));
    // const compose = (f, g) => (...args) => f(g(...args));
    return fns.reduce(pipe);
}
