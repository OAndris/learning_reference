function binarySearch(arr, value, startPos = 0, endPos = arr.length) {
    // Example for a binary search algorithm using recursion
    if (startPos > endPos) {
        return null;
    }
    let midPos = Math.floor((startPos + endPos) / 2);
    if (arr[midPos] === value) {
        return midPos;
    }
    return arr[midPos] > value
        ? binarySearch(arr, value, startPos, midPos - 1)
        : binarySearch(arr, value, midPos + 1, endPos);
}

const arr = [2, 3, 4, 5, 7];
const idx = binarySearch(arr, 5);
console.log(idx);
