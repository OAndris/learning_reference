const arrays = {
    findMaxValueInArray: (arr) => arr.reduce((prev, curr) => (curr > prev ? curr : prev)),
    findMinValueInArray: (arr) => arr.reduce((prev, curr) => (curr < prev ? curr : prev)),
    findMaxValueInArray2: (arr) => Math.max(...arr),
    findMinValueInArray2: (arr) => Math.min(...arr),

    uniqueValues: (arr) => arr.filter((value, index, arr) => arr.indexOf(value) === index), // excludes duplicates because (arr.indexOf(value) === index) is True only for the first occurance of each unique value
    uniqueValues2: (arr) => [...new Set(arr)],

    countOccurances: (arr) => {
        const counts = {};
        arr.forEach((num) => {
            counts[num] = num in counts ? counts[num] + 1 : 1;
        });
        return counts;
    },

    reverseArray: (arr) =>
        arr.reduce((acc, curr) => {
            acc.unshift(curr); // alternatively, "acc.push" with "arr.reduceRight" could also be used
            return acc;
        }, []),
    reverseArray2: (arr) => arr.reverse(),

    removeFalsyValues: (arr) => arr.filter((value) => !!value), // NOTE: the double exclamation mark isn't even required, it is included only for better readability

    flattenArray: (arr) =>
        arr.reduce((acc, item) => {
            return acc.concat(Array.isArray(item) ? arrays.flattenArray(item) : item);
        }, []),
    flattenArray2: (arr) => arr.flat((depth = Infinity)),
};

const strings = {
    reverseString: (str) => str.split('').reverse().join(''),
};

// EXAMPLES:
// console.log(arrays.findMaxValueInArray([3, 2, 5, 10, 7, -5])); // returns 10
// console.log(arrays.findMinValueInArray([3, 2, 5, 10, 7, -5])); // returns -5
// console.log(arrays.findMaxValueInArray2([3, 2, 5, 10, 7, -5])); // returns 10
// console.log(arrays.findMinValueInArray2([3, 2, 5, 10, 7, -5])); // returns -5

// console.log(arrays.uniqueValues([3, 2, 3, 5, 5, 10, 7, -5])); // returns [ 3, 2, 5, 10, 7, -5 ]
// console.log(arrays.uniqueValues2([3, 2, 3, 5, 5, 10, 7, -5])); // returns [ 3, 2, 5, 10, 7, -5 ]

// console.log(arrays.countOccurances([3, 2, 3, 5, 5, 'js'])); // returns { '2': 1, '3': 2, '5': 2, js: 1 }

// console.log(arrays.reverseArray([3, 2, 3, 5, 5, 'js'])); // returns [ 'js', 5, 5, 3, 2, 3 ]
// console.log(arrays.reverseArray2([3, 2, 3, 5, 5, 'js'])); // returns [ 'js', 5, 5, 3, 2, 3 ]

// console.log(arrays.removeFalsyValues([1, null, false, 'JavaScript', undefined, 0, 5, '0'])); // return [ 1, 'JavaScript', 5, '0' ]

console.log(arrays.flattenArray([1, 2, 3, [4, [5, 6, [7, 8, [9]]]]])); // returns [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log(arrays.flattenArray2([1, 2, 3, [4, [5, 6, [7, 8, [9]]]]])); // returns [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

// console.log(strings.reverseString('JavaScript')); // returns 'tpircSavaJ'
