// Example from "Google JavaScript Interview With A Frontend Engineer" (https://www.youtube.com/watch?v=Rs7ARD5TCFU)

function deepEquals(valueOne, valueTwo) {
    if (typeof valueOne !== typeof valueTwo) return false;

    // Check primitives (String, Number, undefined):
    if (typeof valueOne !== 'object' && typeof valueTwo !== 'object') {
        // NaN is a special case, because (NaN !== NaN), even though (typeof NaN === 'number')
        if (Number.isNaN(valueOne) && Number.isNaN(valueTwo)) return true; // use "Number.isNaN" instead of the global "isNaN", because the latter forcefully converts to number and thus returns true for strings, too

        // All other primitives:
        return valueOne === valueTwo;
    }

    // Check nulls (note that typeof null === 'object'):
    if (valueOne === null && valueTwo === null) return true; // equal if both are null
    if (valueOne === null || valueTwo === null) return false; // not equal if exactly one is null

    // Special case to skip further, value-by-value comparison in case of strict equality (for arrays and objects, the reference itself has to be the same):
    if (valueOne === valueTwo) return true; // this is not strictly necessary, but can be a useful shortcut for performance improvement in some cases (to just skip the value by value comparison)

    // Check arrays (note that typeof [] === 'object'):
    if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
        if (valueOne.length !== valueTwo.length) return false;
        for (let i = 0; i < valueOne.length; i++) {
            if (!deepEquals(valueOne[i], valueTwo[i])) return false; // recursively check all depth levels and return early if there's any difference
        }
        return true;
    }
    if (Array.isArray(valueOne) || Array.isArray(valueTwo)) return false; // special case when exactly one of the inputs is an array (the other is an actual object)

    // Check actual objects:
    const valueOneKeys = Object.keys(valueOne);
    const valueTwoKeys = Object.keys(valueTwo);
    if (valueOneKeys.length !== valueTwoKeys.length) return false;
    if (!deepEquals(valueOneKeys, valueTwoKeys)) return false;
    for (let i = 0; i < valueOneKeys.length; i++) {
        if (!deepEquals(valueOne[valueOneKeys[i]], valueTwo[valueOneKeys[i]])) return false;
    }
    return true;
}

//=======================
testCases = [
    // Positives:
    deepEquals('a', 'a'),
    deepEquals(1, 1),
    deepEquals(NaN, NaN),
    deepEquals(undefined, undefined),
    deepEquals(null, null),
    deepEquals([], []),
    deepEquals([1], [1]),
    deepEquals([1, [2, 3], 4], [1, [2, 3], 4]),
    deepEquals({}, {}),
    deepEquals({ a: 1 }, { a: 1 }),
    deepEquals({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }),
    // Negatives:
    !deepEquals('a', 'b'),
    !deepEquals(1, 2),
    !deepEquals(NaN, 1),
    !deepEquals(NaN, 'NaN'),
    !deepEquals(undefined, 'undefined'),
    !deepEquals(null, {}),
    !deepEquals([], [1]),
    !deepEquals([1], [2]),
    !deepEquals([1, [22, 3], 4], [1, [2, 3], 4]),
    !deepEquals({}, { a: 1 }),
    !deepEquals({ a: 1 }, { b: 1 }),
    !deepEquals({ a: 1 }, { a: 2 }),
    !deepEquals({ a: 1, b: { c: 3 } }, { a: 1, b: { c: 2 } }),
    !deepEquals({ a: undefined, b: 2 }, { b: 2, c: 3 }),
];
console.log(testCases.every((res) => res === true));
console.log(testCases);
