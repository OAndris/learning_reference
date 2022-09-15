// import { compare } from './arrayAlgos';
const compare = require('./arrayAlgos');

//=====================
// Bubble sort - quadratic time complexity, O(N^2):
//=====================
// [JavaScript Algorithms - 21 - Bubble Sort Solution](https://www.youtube.com/watch?v=xdCgW2a3r_Q)
const bubbleSort = (arr) => {
    const newArr = [...arr];
    let isSwapped;
    do {
        isSwapped = false;
        for (let i = 0; i < newArr.length - 1; i++) {
            if (newArr[i] > newArr[i + 1]) {
                [newArr[i], newArr[i + 1]] = [newArr[i + 1], newArr[i]];
                isSwapped = true;
            }
        }
    } while (isSwapped);
    return newArr;
};
// compare(bubbleSort([7, 3, 5, 8, 2, 10]), [2, 3, 5, 7, 8, 10]);

//=====================
// Quick sort - average time complexity of O(N * logN):
//=====================
// [JavaScript Algorithms - 24 - Quick Sort](https://www.youtube.com/watch?v=ceqwscS_muA)
// [JavaScript Algorithms - 25 - Quick Sort Solution](https://www.youtube.com/watch?v=lWLTHsQnHDI)
const quickSort = (arr) => {
    if (arr.length < 2) return arr;
    let pivot = arr[arr.length - 1];
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
};
compare(quickSort([7, 3, 5, 8, 2, 10]), [2, 3, 5, 7, 8, 10]);

//=====================
// Merge sort:
//=====================
// [JavaScript Algorithms - 26 - Merge Sort](https://www.youtube.com/watch?v=qInXNtKaf4Q)
// [JavaScript Algorithms - 27 - Merge Sort Solution](https://www.youtube.com/watch?v=wXZyuJqNk9U)
const mergeSort = (arr) => {
    // TODO
};
