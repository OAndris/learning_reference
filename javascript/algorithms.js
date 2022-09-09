/* ==============================================================================================
ARRAY ALGORITHMS
============================================================================================== */
const arrayAlgos = {
    // Given an array of integers, find its maximum / minimum value:
    findMaxValueInArray: (arr) => arr.reduce((cumRes, item) => (item > cumRes ? item : cumRes)),
    findMaxValueInArrayBuiltin: (arr) => Math.max(...arr),

    findMinValueInArray: (arr) => arr.reduce((cumRes, item) => (item < cumRes ? item : cumRes)),
    findMinValueInArrayBuiltin: (arr) => Math.min(...arr),

    // Given an array that may contain duplicate elements, return a new array with unique elements:
    uniqueValues: (arr) => arr.filter((value, index, arr) => arr.indexOf(value) === index), // excludes duplicates because (arr.indexOf(value) === index) is True only for the first occurance of each unique value (lastIndexOf might also be useful)
    uniqueValuesBuiltin: (arr) => [...new Set(arr)],

    // Given an array and a value, return the number of times the value is found in the array:
    countOccurance: (arr, value) => arr.filter((v) => v === value).length,
    countOccurance2: (arr, value) => arr.reduce((count, v) => (v === value ? count + 1 : count), 0),

    // Given an array, return an object that contains its unique elements (as keys) and the number of occurances for each (as values)
    countOccurances: (arr) => {
        const counts = {};
        arr.forEach((item) => (counts[item] = item in counts ? counts[item] + 1 : 1));
        return counts;
    },
    countOccurances2: (arr) => {
        return arr.reduce((counts, item) => {
            return { ...counts, [item]: item in counts ? counts[item] + 1 : 1 };
        }, {});
    },

    // Sum values in array:
    sum: (arr) => arr.reduce((cumRes, num) => cumRes + num, 0),
    sum2: (arr) => (arr.length === 0 ? 0 : arr[0] + arrayAlgos.sum(arr.slice(1))),

    // Given an array, reverse it:
    reverseArray: (arr) => {
        return arr.reduceRight((cumRes, item) => {
            cumRes.push(item); // alternatively, "arr.reduce" with "cumRes.unshift" could also be used, but "cumRes.push" is preferred, because the time complexity of push is O(1), while unshift is O(N)
            return cumRes;
        }, []);
    },
    reverseArrayBuiltin: (arr) => arr.reverse(),

    // Given an array that may contain falsy values, return the non-falsy values:
    removeFalsyValues: (arr) => arr.filter((value) => !!value), // NOTE: the double exclamation mark isn't strictly required, it is included only for better readability

    // Given an array that contains nested array(s) with arbitrary levels of depth, return a flat array (that contains just the values from each array on every level)
    flatInfiniteDepth: (arr) => {
        return arr.reduce((cumRes, item) => {
            return cumRes.concat(!Array.isArray(item) ? item : arrayAlgos.flatInfiniteDepth(item));
        }, []);
    },
    flatCustomDepth: (arr, depth = 1) => {
        return arr.reduce((cumRes, item) => {
            return depth > 0
                ? cumRes.concat(!Array.isArray(item) ? item : arrayAlgos.flatCustomDepth(item, depth - 1))
                : arr;
        }, []);
    },
    flatCustomDepthBuiltin: (arr, depth = 1) => arr.flat(depth), // NOTE: depth can also be Infinity

    // Keep only certain key-value pairs in an array of objects:
    keepPropertiesForObjectsInArray: (arr) => arr.map(({ keepKey1, keepKey2 }) => ({ keepKey1, keepKey2 })),

    // Delete certain key-value pairs in an array of objects:
    deletePropertiesForObjectsInArray: (arr) => arr.map(({ dropKey1, dropKey2, ...keepKeys }) => keepKeys),
};

// Test cases for array related algorithms:
const str = (value) => JSON.stringify(value); // allow easy comparison between both arrays and objects

testcasesForArrayAlgos = [
    arrayAlgos.findMaxValueInArray([3, 2, 5, 10, 7, -5]) === 10,
    arrayAlgos.findMaxValueInArrayBuiltin([3, 2, 5, 10, 7, -5]) === 10,
    arrayAlgos.findMinValueInArray([3, 2, 5, 10, 7, -5]) === -5,
    arrayAlgos.findMinValueInArrayBuiltin([3, 2, 5, 10, 7, -5]) === -5,

    str(arrayAlgos.uniqueValues([3, 2, 3, 5, 5, 10, 7, -5])) === str([3, 2, 5, 10, 7, -5]),
    str(arrayAlgos.uniqueValuesBuiltin([3, 2, 3, 5, 5, 10, 7, -5])) === str([3, 2, 5, 10, 7, -5]),

    arrayAlgos.countOccurance([3, 2, 3, 5, 5, 'js'], 5) === 2,
    arrayAlgos.countOccurance2([3, 2, 3, 5, 5, 'js'], 5) === 2,

    str(arrayAlgos.countOccurances([3, 2, 3, 5, 5, 'js'])) === str({ 2: 1, 3: 2, 5: 2, js: 1 }),
    str(arrayAlgos.countOccurances2([3, 2, 3, 5, 5, 'js'])) === str({ 2: 1, 3: 2, 5: 2, js: 1 }),

    arrayAlgos.sum([3, 2, 3, 5, 5, 10, 7, -5]) === 30,
    arrayAlgos.sum2([3, 2, 3, 5, 5, 10, 7, -5]) === 30,

    str(arrayAlgos.reverseArray([3, 2, 3, 5, 5, 'js'])) === str(['js', 5, 5, 3, 2, 3]),
    str(arrayAlgos.reverseArrayBuiltin([3, 2, 3, 5, 5, 'js'])) === str(['js', 5, 5, 3, 2, 3]),

    str(arrayAlgos.removeFalsyValues([1, null, false, 'JavaScript', undefined, 0, 5, '0'])) ===
        str([1, 'JavaScript', 5, '0']),

    str(arrayAlgos.flatInfiniteDepth([1, 2, 3, [4, [5, 6, [7, 8, [9]]]]])) === str([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    str(arrayAlgos.flatCustomDepth([1, 2, 3, [4, [5, 6, [7, 8, [9]]]]], (depth = Infinity))) ===
        str([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    str(arrayAlgos.flatCustomDepthBuiltin([1, 2, 3, [4, [5, 6, [7, 8, [9]]]]], (depth = Infinity))) ===
        str([1, 2, 3, 4, 5, 6, 7, 8, 9]),

    str(
        arrayAlgos.keepPropertiesForObjectsInArray([
            { keepKey1: 1, x: 2, keepKey2: 3 },
            { keepKey1: 11, x: 22, keepKey2: 33 },
        ])
    ) ===
        str([
            { keepKey1: 1, keepKey2: 3 },
            { keepKey1: 11, keepKey2: 33 },
        ]),

    str(
        arrayAlgos.deletePropertiesForObjectsInArray([
            { dropKey1: 1, x: 2, dropKey2: 3 },
            { dropKey1: 11, x: 22, dropKey2: 33 },
        ])
    ) === str([{ x: 2 }, { x: 22 }]),
];
console.log('Details: ', testcasesForArrayAlgos);
console.log(`Overall result: ${testcasesForArrayAlgos.every((value) => value)}`);

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
