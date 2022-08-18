/*
Custom implementation of some of the most important built-in array methods.

Based on "You Should Know How To Do This Before Applying For Jobs" by Web Dev Simplified (https://www.youtube.com/watch?v=BiblrzKMllc)
*/

const arr = [17, 10, 5, 4, 3, 5, 9];

Array.prototype.forEach2 = function (cb) {
    for (let i = 0; i < this.length; i++) {
        cb(this[i], i, this);
    }
};
// arr.forEach2((value, idx, array) => {
//     console.log(value, idx, array);
// });

Array.prototype.map2 = function (cb) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(cb(this[i], i, this));
    }
    return result;
};
// console.log(arr.map2((value, idx, array) => value * 2));

Array.prototype.filter2 = function (cb) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};
// console.log(arr.filter2((value, idx, array) => value % 2 === 0));
// console.log(arr.filter2((value, idx, array) => value % 2 === 1));

Array.prototype.reduce2 = function (cb, initValue) {
    let cumulatedValue = initValue;
    for (let i = 0; i < this.length; i++) {
        if ((initValue === null || initValue === undefined) && i === 0) {
            cumulatedValue = this[0];
        } else {
            cumulatedValue = cb(cumulatedValue, this[i], i, this);
        }
    }
    return cumulatedValue;
};
// console.log(arr.reduce2((acc, curr) => acc + curr));
// console.log(arr.reduce2((acc, curr) => acc + curr, 10));
// console.log(arr.reduce2((acc, curr) => (curr > acc ? curr : acc)));
// console.log(arr.reduce2((acc, curr) => (curr > acc ? curr : acc), 5));

Array.prototype.some2 = function (cb) {
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) {
            return true;
        }
    }
    return false;
};
// console.log(arr.some2((value, idx, array) => value === 5));
// console.log(arr.some2((value, idx, array) => value === 7));

Array.prototype.every2 = function (cb) {
    for (let i = 0; i < this.length; i++) {
        if (!cb(this[i], i, this)) {
            return false;
        }
    }
    return true;
};
// console.log(arr.every2((value, idx, array) => value % 2 === 1));
// console.log(arr.every2((value, idx, array) => value === 7));
// console.log(arr.every2((value, idx, array) => value <= 17));

Array.prototype.flat2 = function (depth = 1) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (Array.isArray(this[i]) && depth > 0) {
            result.push(...this[i].flat2(depth - 1));
        } else {
            result.push(this[i]);
        }
    }
    return result;
};
// console.log([1, 2, [3, 4], [5, [6, 7]], 9].flat2());
// console.log([1, 2, [3, 4], [5, [6, 7]], 9].flat2((depth = 2)));

Array.prototype.find2 = function (cb) {
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) {
            return this[i];
        }
    }
};
// console.log(arr.find2((value, idx, array) => value % 2 === 0));
// console.log(arr.find2((value, idx, array) => value % 2 === 1));
// console.log(arr.find2((value, idx, array) => value === 5));
// console.log(arr.find2((value, idx, array) => idx === 3));

Array.prototype.indexOf2 = function (element) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === element) {
            return i;
        }
    }
    return -1;
};
// console.log(arr.indexOf2(5));
// console.log(arr.indexOf2(9));
// console.log(arr.indexOf2(10));
// console.log(arr.indexOf2(50));

Array.prototype.lastIndexOf2 = function (element) {
    for (let i = this.length - 1; i >= 0; i--) {
        console.log(this[i]);
        if (this[i] === element) {
            return i;
        }
    }
    return -1;
};
// console.log(arr.lastIndexOf2(5));
// console.log(arr.lastIndexOf2(9));
// console.log(arr.lastIndexOf2(10));
// console.log(arr.lastIndexOf2(50));

Array.prototype.reverse2 = function () {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.unshift(this[i]);
    }
    return result;
};
// console.log(arr.reverse2());
