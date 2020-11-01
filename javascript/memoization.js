/*
Memoization is a specific form of caching, that involves caching the return value of a function based on its input parameters.
In this example, the return value of memoizedAddTo80(5) is memoized so that whenever the same function is called with the same inputs,
the memoized value is returned, and the complex, time consuming operation is not repeated (unless it is called with new parameters).

Source of example code: https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15163222#overview
*/

// Standard version:
function addTo80(n) {
    console.log(`this is a complex operation taking much time... called with ${n}`);
    return n + 80;
}

// Memoized version:
let cache = {};
function memoizedAddTo80(n) {
    if (n in cache) {
        return cache[n];
    } else {
        console.log(`this is a complex operation taking much time... called with ${n}`);
        cache[n] = n + 80;
        return cache[n];
    }
}

//======================================

console.log('Standard version:');
addTo80(5);
addTo80(5);
addTo80(7);

console.log('\nMemoized version:');
memoizedAddTo80(5);
memoizedAddTo80(5); // Since 'memoizedAddTo80' is memoized, this second call with the same parameter won't execute the time-consuming operation (it will just return the memoized return value)
memoizedAddTo80(7);
