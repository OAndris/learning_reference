// [10 Design Patterns Explained in 10 Minutes](https://www.youtube.com/watch?v=tv-_1er1mWI)

const range = (start, end, step = 1) => {
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (start < end) {
                const nextResult = { value: start, done: false };
                start = start + step;
                return nextResult;
            }
            return { value: end, done: true };
        },
    };
};

console.log(typeof range(2, 70)); // object
console.log(range(2, 70)); // iterator object with 2 properties (next and a Symbol.iterator)
console.log(range(2, 70).next()); // { value: 2, done: false }

console.log([...range(3, 10, 2)]); // [3, 5, 7, 9]
for (const n of range(0, 20, 5)) {
    console.log(n); // 0; 5; 10; 15
}
