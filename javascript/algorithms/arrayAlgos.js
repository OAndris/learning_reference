// ARRAY ALGORITHMS

//==================================================================================================================
// Helper function to allow easy comparison between pass-by-reference data types (objects, including arrays), not just primitives
//==================================================================================================================
module.exports = compare = (calculatedResult, expectedResult) => {
    const calcRes = typeof calculatedResult === 'object' ? JSON.stringify(calculatedResult) : calculatedResult;
    const expectedRes = typeof expectedResult === 'object' ? JSON.stringify(expectedResult) : expectedResult;
    const isEqual = calcRes === expectedRes;
    console.log(isEqual, !isEqual ? ` (expected: ${expectedRes}, actual: ${calcRes})` : '');
};

//=====================
// Given an array of integers, find its maximum / minimum value:
//=====================
const findMinValueInArrayBuiltin = (arr) => Math.min(...arr);
const findMaxValueInArrayBuiltin = (arr) => Math.max(...arr);
const findMinValueInArray = (arr) => arr.reduce((cumRes, item) => (item < cumRes ? item : cumRes));
const findMaxValueInArray = (arr) => arr.reduce((cumRes, item) => (item > cumRes ? item : cumRes));
// compare(findMinValueInArrayBuiltin([3, 2, 5, 10, 7, -5]), -5);
// compare(findMaxValueInArrayBuiltin([3, 2, 5, 10, 7, -5]), 10);
// compare(findMinValueInArray([3, 2, 5, 10, 7, -5]), -5);
// compare(findMaxValueInArray([3, 2, 5, 10, 7, -5]), 10);

//=====================
// Given an array that may contain duplicate elements, return a new array with unique elements:
//=====================
const uniqueValuesBuiltin = (arr) => [...new Set(arr)];
const uniqueValues = (arr) => arr.filter((value, index, arr) => arr.indexOf(value) === index); // excludes duplicates because (arr.indexOf(value) === index) is True only for the first occurance of each unique value (lastIndexOf might also be useful)
// compare(uniqueValuesBuiltin([3, 2, 3, 5, 5, 10, 7, -5]), [3, 2, 5, 10, 7, -5]);
// compare(uniqueValues([3, 2, 3, 5, 5, 10, 7, -5]), [3, 2, 5, 10, 7, -5]);

//=====================
// Given an array and a value, return the number of times the value is found in the array:
//=====================
const countOccurance = (arr, value) => arr.filter((v) => v === value).length;
const countOccurance2 = (arr, value) => arr.reduce((count, v) => (v === value ? count + 1 : count), 0);
// compare(countOccurance([3, 2, 3, 5, 5, 'js'], 5), 2);
// compare(countOccurance2([3, 2, 3, 5, 5, 'js'], 5), 2);

//=====================
// Given an array, return an object that contains its unique elements (as keys) and the number of occurances for each (as values)
//=====================
const countOccurances = (arr) => {
    const counts = {};
    arr.forEach((item) => (counts[item] = item in counts ? counts[item] + 1 : 1));
    return counts;
};
const countOccurances2 = (arr) => {
    return arr.reduce((counts, item) => {
        return { ...counts, [item]: item in counts ? counts[item] + 1 : 1 };
    }, {});
};
// compare(countOccurances([3, 2, 3, 5, 5, 'js']), { 2: 1, 3: 2, 5: 2, js: 1 });
// compare(countOccurances2([3, 2, 3, 5, 5, 'js']), { 2: 1, 3: 2, 5: 2, js: 1 });

//=====================
// Sum values in array:
//=====================
const sum = (arr) => arr.reduce((cumRes, num) => cumRes + num, 0);
const sum2 = (arr) => (arr.length === 0 ? 0 : arr[0] + sum(arr.slice(1)));
// compare(sum([3, 2, 3, 5, 5, 10, 7, -5]), 30);
// compare(sum2([3, 2, 3, 5, 5, 10, 7, -5]), 30);

//=====================
// Given an array, reverse it:
//=====================
const reverseArrayBuiltin = (arr) => arr.reverse();
const reverseArray = (arr) => {
    return arr.reduceRight((cumRes, item) => {
        cumRes.push(item); // alternatively, "arr.reduce" with "cumRes.unshift" could also be used, but "cumRes.push" is preferred, because the time complexity of push is O(1), while unshift is O(N)
        return cumRes;
    }, []);
};
// compare(reverseArrayBuiltin([3, 2, 3, 5, 5, 'js']), ['js', 5, 5, 3, 2, 3]);
// compare(reverseArray([3, 2, 3, 5, 5, 'js']), ['js', 5, 5, 3, 2, 3]);

//=====================
// Given an array that may contain falsy values, return the non-falsy values:
//=====================
const removeFalsyValues = (arr) => arr.filter((value) => !!value); // NOTE: the double exclamation mark isn't strictly required, it is included only for better readability
// compare(removeFalsyValues([1, null, false, 'JavaScript', '', undefined, 0, 5, '0']), [1, 'JavaScript', 5, '0']);

//=====================
// Given an array that contains nested array(s) with arbitrary levels of depth, return a flat array (that contains just the values from each array on every level)
//=====================
const flatCustomDepthBuiltin = (arr, depth = 1) => arr.flat(depth); // NOTE: depth can also be Infinity
const flatInfiniteDepth = (arr) => {
    return arr.reduce((cumRes, item) => {
        return cumRes.concat(!Array.isArray(item) ? item : flatInfiniteDepth(item));
    }, []);
};
const flatCustomDepth = (arr, depth = 1) => {
    return arr.reduce((cumRes, item) => {
        return depth > 0 ? cumRes.concat(!Array.isArray(item) ? item : flatCustomDepth(item, depth - 1)) : arr;
    }, []);
};
// compare(flatCustomDepthBuiltin([1, 2, 3, [4, [5, 6, [7, 8, [9]]]]], (depth = Infinity)), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
// compare(flatInfiniteDepth([1, 2, 3, [4, [5, 6, [7, 8, [9]]]]]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
// compare(flatCustomDepth([1, 2, 3, [4, [5, 6, [7, 8, [9]]]]], (depth = Infinity)), [1, 2, 3, 4, 5, 6, 7, 8, 9]);

//=====================
// Keep only certain key-value pairs in an array of objects:
//=====================
const keepPropertiesForObjectsInArray = (arr) => arr.map(({ keepKey1, keepKey2 }) => ({ keepKey1, keepKey2 }));
// compare(
//     keepPropertiesForObjectsInArray([
//         { keepKey1: 1, x: 2, keepKey2: 3 },
//         { keepKey1: 11, x: 22, keepKey2: 33 },
//     ]),
//     [
//         { keepKey1: 1, keepKey2: 3 },
//         { keepKey1: 11, keepKey2: 33 },
//     ]
// );

//=====================
// Delete certain key-value pairs in an array of objects:
//=====================
const deletePropertiesForObjectsInArray = (arr) => arr.map(({ dropKey1, dropKey2, ...keepKeys }) => keepKeys);
// compare(
//     deletePropertiesForObjectsInArray([
//         { dropKey1: 1, x: 2, dropKey2: 3 },
//         { dropKey1: 11, x: 22, dropKey2: 33 },
//     ]),
//     [{ x: 2 }, { x: 22 }]
// );

//=====================
// Find the maximum difference between a sequence of numbers. Example: [20, 18, 14, 17, 20, 21, 15] --> 7 (i.e. 21 - 14). Hint: https://realpython.com/numpy-array-programming/
//=====================
const findMaxDiff = (arr) => {
    // Solution 1 (O(N^2) time complexity): iterate through the elements of the array and in each iteration, also iterate through the elements that come later in the array, checking the maximum possible difference for each element, and taking their max.
    // Solution 2 (O(N) time complexity): iterate through the elements of the array and keep track of a running minimum of the already seen variables in every iteration (i.e. running minimum). Take the difference of the current value and the running minimum. If higher than the current maximum difference, update maxDiff.
    let maxDiff = 0;
    let runningMin = arr[0];
    for (value of arr.slice(1)) {
        maxDiff = Math.max(maxDiff, value - runningMin);
        runningMin = Math.min(runningMin, value);
    }
    return maxDiff;
};
// compare(findMaxDiff([20, 18, 14, 17, 20, 21, 15]), 7);

//=====================
// Given an integer, calculate the corresponding Fibonacci number. Remember: fib(n) = fib(n-1) + fib(n-2), and fib(0) == 1, fib(1) == 1. Hint: [Interview Question: Fibonacci Number](https://www.youtube.com/watch?v=Nki9hhW-tAI)
//=====================
const inefficientFibonacci = (n) => {
    if (n < 0) return -1;
    if (n === 0) return 0;
    if (n === 1) return 1;
    return inefficientFibonacci(n - 1) + inefficientFibonacci(n - 2);
}; // this solution is highly inefficient because it results in a lot of duplicate, unnecessary & computationally expensive calculation --> already calculated values need to be cached

const fibonacciWithCache = () => {
    const cache = [0, 1];
    const fibonacci = (n) => {
        if (n < 0) return -1;
        if (n === 0) return 0;
        if (n === 1) return 1;
        if (cache[n] === undefined) {
            cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
        }
        return cache[n];
    };
    return fibonacci; // a closure with a cache, making it efficient
};
const fibonacci = fibonacciWithCache();
// compare(fibonacci(8), 21);

//=====================
// Shuffle an array:
//=====================
const shuffle = (arr) => {
    // Implementation of the "Fisher–Yates shuffle algorithm":
    const newArr = [...arr];
    for (let i = 0; i < newArr.length; i++) {
        const randomIndex = Math.floor(Math.random() * newArr.length);
        [newArr[i], newArr[randomIndex]] = [newArr[randomIndex], newArr[i]];
    }
    return newArr;
};
// const arr = ['a', 'g', '5', { hello: 5 }, 7];
// console.log(arr);
// console.log(shuffle(arr));
// console.log(arr);
