/*
    Closure: a function that is defined inside a function and relies on variables defined in the outer function.
    
    Definition from MDN:
    "Closures are functions that refer to independent (free) variables (variables that are used locally,
    but defined in an enclosing scope). In other words, these functions 'remember' the environment in which they were created."
    
    When the outer function is called, it just returns this inner function, thus the variables defined in the outer function
    will remain accessible for the inner function, even though they are not accessible for the outer world.
*/

// Standard version:
function doSomeMath() {
    // Variables a, b and result are only accessible inside the function.
    let a = 5;
    let b = 4;
    let result = a * b;
    return result;
}

// Closure:
function doSomeMathWithClosure() {
    let a = 5;
    let b = 4;
    function multiply() {
        // This function is a closure since it uses variables that are defined in an enclosing scope (not directly in this function's scope).
        let result = a * b;
        return result;
    }
    return multiply;
}

let theResult = doSomeMathWithClosure()();
console.log('The result: ', theResult);

// ==============================================================================

// Example:
const multiplyBy = (num1) => (num2) => num1 * num2;
const multiplyByTwo = multiplyBy(2);
const multiplyByThree = multiplyBy(3);

// Example:
const fun = (a, b) => {
    return b !== undefined ? a * b : (b) => a * b;
};
fun(3, 5);
fun(3)(10);

// Memory efficiency:
function createBigArray() {
    const bigArray = new Array(7000).fill(0);
    return (index) => bigArray[index];
}
const getElementFromBigArray = createBigArray();
console.log('Element from big array: ', getElementFromBigArray(10));

// Safety:
const initialize = () => {
    let view;
    let isInitialized = false;
    return () => {
        if (isInitialized) {
            console.log('Skipping initialization, view is already set!');
            return;
        } else {
            isInitialized = true;
            view = 'myView';
            console.log(`View has been set: ${view}`);
        }
    };
};
const initOnce = initialize();
initOnce();
initOnce();
initOnce();

// Encapsulation:
const makeNuclearButton = () => {
    let timeWithoutDestruction = 0;
    const incrementPassedTime = () => timeWithoutDestruction++;
    const getTotalPeaceTime = () => timeWithoutDestruction;
    const launch = () => {
        timeWithoutDestruction = -1;
        return 'boom';
    };
    setInterval(incrementPassedTime, 1000);
    return {
        launch: launch,
        totalPeaceTime: getTotalPeaceTime,
    };
};
// const ohno = makeNuclearButton();
// console.log(ohno.totalPeaceTime());
