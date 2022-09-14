// STRING ALGORITHMS

//=====================
// Given a string, reverse it:
//=====================
const reverseString = (str) => str.split('').reverse().join('');
// console.log(reverseString('JavaScript') === 'tpircSavaJ');

//=====================
// Given a string, detect whether or not it is a pangram (a sentence that contains every single letter of the alphabet at least once).
//=====================
const isPangram = (str) => {
    const alphabet = Array.from(Array(26)).map((_, i) => String.fromCharCode(i + 65)); // array of uppercase characters of the English alphabet from "a" to "z"
    return alphabet.filter((char) => !str.toUpperCase().includes(char)).length === 0;
};
console.log(isPangram('hello'));
console.log(isPangram('The quick brown fox jumps over a lazy dog'));
