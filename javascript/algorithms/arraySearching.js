const compare = require('./arrayAlgos');

//=====================
// Binary search - logarithmic time complexity, O(logN):
//=====================
// [JavaScript Algorithms - 17 - Binary Search Solution](https://www.youtube.com/watch?v=75jGy1xAhhs)
const binarySearch = (sortedArray, item) => {
    let lowerIdx = 0;
    let upperIdx = sortedArray.length - 1;
    while (lowerIdx <= upperIdx) {
        let midIdx = Math.floor((lowerIdx + upperIdx) / 2);
        if (item === sortedArray[midIdx]) {
            return midIdx;
        } else if (item > sortedArray[midIdx]) {
            lowerIdx = midIdx + 1;
        } else {
            upperIdx = midIdx - 1;
        }
    }
    return -1;
};
// compare(binarySearch([3, 5, 6, 8, 11], 5), 1);
// compare(binarySearch([3, 5, 6, 8, 10, 11], 10), 4);
// compare(binarySearch([3, 5, 6, 8, 10, 11], 20), -1);

//=====================
// Binary search with recursion - logarithmic time complexity, O(logN):
//=====================
// [JavaScript Algorithms - 18 - Recursive Binary Search](https://www.youtube.com/watch?v=EFXWgZJZqL8)
const binarySearchRecursive = (sortedArray, item, lowerIdx = 0, upperIdx = sortedArray.length - 1) => {
    if (lowerIdx > upperIdx) return -1;
    const midIdx = Math.floor((lowerIdx + upperIdx) / 2);
    if (sortedArray[midIdx] === item) {
        return midIdx;
    } else if (item > sortedArray[midIdx]) {
        return binarySearchRecursive(sortedArray, item, (lowerIdx = midIdx + 1));
    } else {
        return binarySearchRecursive(sortedArray, item, (lowerIdx = 0), (upperIdx = midIdx));
    }
};
// compare(binarySearchRecursive([3, 5, 6, 8, 11], 5), 1);
// compare(binarySearchRecursive([3, 5, 6, 8, 10, 11], 10), 4);
// compare(binarySearchRecursive([3, 5, 6, 8, 10, 11], 20), -1);
