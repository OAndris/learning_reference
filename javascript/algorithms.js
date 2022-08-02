/* ==============================================================================================
ARRAY ALGORITHMS
============================================================================================== */
const arrayAlgos = {
    // Given an array of integers, find its maximum (or minimum) value:
    findMaxValueInArray: (arr) => arr.reduce((acc, curr) => (curr > acc ? curr : acc)),
    findMaxValueInArray2: (arr) => Math.max(...arr),
    findMinValueInArray: (arr) => arr.reduce((acc, curr) => (curr < acc ? curr : acc)),
    findMinValueInArray2: (arr) => Math.min(...arr),

    // Given an array that may contain duplicate elements, return a new array with unique elements:
    uniqueValues: (arr) => arr.filter((value, index, arr) => arr.indexOf(value) === index), // excludes duplicates because (arr.indexOf(value) === index) is True only for the first occurance of each unique value
    uniqueValues2: (arr) => [...new Set(arr)],

    // Given an array, return an object that contains its unique elements (as keys) and the number of occurances for each (as values)
    countOccurances: (arr) => {
        const counts = {};
        arr.forEach((num) => {
            counts[num] = num in counts ? counts[num] + 1 : 1;
        });
        return counts;
    },

    // Given an array, reverse it:
    reverseArray: (arr) =>
        arr.reduce((acc, curr) => {
            acc.unshift(curr); // alternatively, "acc.push" with "arr.reduceRight" could also be used
            return acc;
        }, []),
    reverseArray2: (arr) => arr.reverse(),

    // Given an array that may contain falsy values, return the non-falsy values:
    removeFalsyValues: (arr) => arr.filter((value) => !!value), // NOTE: the double exclamation mark isn't strictly required, it is included only for better readability

    // Given an array that contains nested array with an arbitrary level of depth, return a flat array (consisting just the values from each array on every level)
    flattenArray: (arr) =>
        arr.reduce((acc, item) => {
            return acc.concat(Array.isArray(item) ? arrayAlgos.flattenArray(item) : item);
        }, []),
    flattenArray2: (arr) => arr.flat((depth = Infinity)),
};

// Test cases for array related algorithms:
testcasesForArrayAlgos = [
    arrayAlgos.findMaxValueInArray([3, 2, 5, 10, 7, -5]) === 10,
    arrayAlgos.findMaxValueInArray2([3, 2, 5, 10, 7, -5]) === 10,
    arrayAlgos.findMinValueInArray([3, 2, 5, 10, 7, -5]) === -5,
    arrayAlgos.findMinValueInArray2([3, 2, 5, 10, 7, -5]) === -5,

    String(arrayAlgos.uniqueValues([3, 2, 3, 5, 5, 10, 7, -5])) === String([3, 2, 5, 10, 7, -5]),
    String(arrayAlgos.uniqueValues2([3, 2, 3, 5, 5, 10, 7, -5])) === String([3, 2, 5, 10, 7, -5]),

    String(arrayAlgos.countOccurances([3, 2, 3, 5, 5, 'js'])) === String({ 2: 1, 3: 2, 5: 2, js: 1 }),

    String(arrayAlgos.reverseArray([3, 2, 3, 5, 5, 'js'])) === String(['js', 5, 5, 3, 2, 3]),
    String(arrayAlgos.reverseArray2([3, 2, 3, 5, 5, 'js'])) === String(['js', 5, 5, 3, 2, 3]),

    String(arrayAlgos.removeFalsyValues([1, null, false, 'JavaScript', undefined, 0, 5, '0'])) ===
        String([1, 'JavaScript', 5, '0']),

    String(arrayAlgos.flattenArray([1, 2, 3, [4, [5, 6, [7, 8, [9]]]]])) === String([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    String(arrayAlgos.flattenArray2([1, 2, 3, [4, [5, 6, [7, 8, [9]]]]])) === String([1, 2, 3, 4, 5, 6, 7, 8, 9]),
];
console.log(testcasesForArrayAlgos);

/* ==============================================================================================
STRING ALGORITHMS
============================================================================================== */
const stringAlgos = {
    // Given a string, reverse it:
    reverseString: (str) => str.split('').reverse().join(''),
};

// Test cases for string related algorithms:
testcasesForStringAlgos = [
    stringAlgos.reverseString('JavaScript') === 'tpircSavaJ',
    // TODO
];
console.log(testcasesForStringAlgos);
