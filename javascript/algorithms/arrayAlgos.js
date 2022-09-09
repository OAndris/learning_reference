// ARRAY ALGORITHMS

//=====================
// Given an array of integers, find its maximum / minimum value:
//=====================
const findMinValueInArrayBuiltin = (arr) => Math.min(...arr);
const findMaxValueInArrayBuiltin = (arr) => Math.max(...arr);
const findMinValueInArray = (arr) => arr.reduce((cumRes, item) => (item < cumRes ? item : cumRes));
const findMaxValueInArray = (arr) => arr.reduce((cumRes, item) => (item > cumRes ? item : cumRes));
// _compare(findMinValueInArrayBuiltin([3, 2, 5, 10, 7, -5]), -5);
// _compare(findMaxValueInArrayBuiltin([3, 2, 5, 10, 7, -5]), 10);
// _compare(findMinValueInArray([3, 2, 5, 10, 7, -5]), -5);
// _compare(findMaxValueInArray([3, 2, 5, 10, 7, -5]), 10);

//=====================
// Given an array that may contain duplicate elements, return a new array with unique elements:
//=====================
const uniqueValuesBuiltin = (arr) => [...new Set(arr)];
const uniqueValues = (arr) => arr.filter((value, index, arr) => arr.indexOf(value) === index); // excludes duplicates because (arr.indexOf(value) === index) is True only for the first occurance of each unique value (lastIndexOf might also be useful)
// _compare(uniqueValuesBuiltin([3, 2, 3, 5, 5, 10, 7, -5]), [3, 2, 5, 10, 7, -5]);
// _compare(uniqueValues([3, 2, 3, 5, 5, 10, 7, -5]), [3, 2, 5, 10, 7, -5]);

//=====================
// Given an array and a value, return the number of times the value is found in the array:
//=====================
const countOccurance = (arr, value) => arr.filter((v) => v === value).length;
const countOccurance2 = (arr, value) => arr.reduce((count, v) => (v === value ? count + 1 : count), 0);
// _compare(countOccurance([3, 2, 3, 5, 5, 'js'], 5), 2);
// _compare(countOccurance2([3, 2, 3, 5, 5, 'js'], 5), 2);

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
// _compare(countOccurances([3, 2, 3, 5, 5, 'js']), { 2: 1, 3: 2, 5: 2, js: 1 });
// _compare(countOccurances2([3, 2, 3, 5, 5, 'js']), { 2: 1, 3: 2, 5: 2, js: 1 });

//=====================
// Sum values in array:
//=====================
const sum = (arr) => arr.reduce((cumRes, num) => cumRes + num, 0);
const sum2 = (arr) => (arr.length === 0 ? 0 : arr[0] + sum(arr.slice(1)));
// _compare(sum([3, 2, 3, 5, 5, 10, 7, -5]), 30);
// _compare(sum2([3, 2, 3, 5, 5, 10, 7, -5]), 30);

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
// _compare(reverseArrayBuiltin([3, 2, 3, 5, 5, 'js']), ['js', 5, 5, 3, 2, 3]);
// _compare(reverseArray([3, 2, 3, 5, 5, 'js']), ['js', 5, 5, 3, 2, 3]);

//=====================
// Given an array that may contain falsy values, return the non-falsy values:
//=====================
const removeFalsyValues = (arr) => arr.filter((value) => !!value); // NOTE: the double exclamation mark isn't strictly required, it is included only for better readability
// _compare(removeFalsyValues([1, null, false, 'JavaScript', '', undefined, 0, 5, '0']), [1, 'JavaScript', 5, '0']);

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
// _compare(flatCustomDepthBuiltin([1, 2, 3, [4, [5, 6, [7, 8, [9]]]]], (depth = Infinity)), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
// _compare(flatInfiniteDepth([1, 2, 3, [4, [5, 6, [7, 8, [9]]]]]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
// _compare(flatCustomDepth([1, 2, 3, [4, [5, 6, [7, 8, [9]]]]], (depth = Infinity)), [1, 2, 3, 4, 5, 6, 7, 8, 9]);

//=====================
// Keep only certain key-value pairs in an array of objects:
//=====================
const keepPropertiesForObjectsInArray = (arr) => arr.map(({ keepKey1, keepKey2 }) => ({ keepKey1, keepKey2 }));
// _compare(
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
// _compare(
//     deletePropertiesForObjectsInArray([
//         { dropKey1: 1, x: 2, dropKey2: 3 },
//         { dropKey1: 11, x: 22, dropKey2: 33 },
//     ]),
//     [{ x: 2 }, { x: 22 }]
// );

//==================================================================================================================
// Helper function to allow easy comparison between pass-by-reference data types (objects, including arrays), not just primitives
//==================================================================================================================
function _compare(calculatedResult, expectedResult) {
    const calcRes = typeof calculatedResult === 'object' ? JSON.stringify(calculatedResult) : calculatedResult;
    const expectedRes = typeof expectedResult === 'object' ? JSON.stringify(expectedResult) : expectedResult;
    console.log(calcRes === expectedRes);
}
