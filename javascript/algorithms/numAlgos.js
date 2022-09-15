//=====================
// Check whether a number is a prime number or not:
//=====================
// [JavaScript Algorithms - 9 - Prime Number](https://www.youtube.com/watch?v=cbHMQxOuIUw&list=PLC3y8-rFHvwiRYB4-HHKHblh3_bQNJTMa&index=10)
const isPrime = (n) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
};
// console.log(isPrime(1));
// console.log(isPrime(4));
// console.log(isPrime(5));
// console.log(isPrime(6));
// console.log(isPrime(7));
