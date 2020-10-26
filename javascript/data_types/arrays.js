const myArray = [1, 3, 4, 5, 7, 8, 9];

// Array.map()
console.log('Array.map()');
console.log(myArray.map((element) => element * 2));
console.log(myArray.map((element, idx) => element + idx));

// Array.filter()
console.log('\nArray.filter()');
console.log(myArray.filter((element) => element % 2 === 0));
console.log(myArray.filter((element, idx) => idx % 2 === 0));

// Array.reduce()
console.log('\nArray.reduce()');
console.log(myArray.reduce((accumulator, element) => accumulator + element, 0));
console.log(myArray.reduce((accumulator, element) => accumulator + element, 10));

// Array.find()
console.log('\nArray.find()');
console.log(myArray.find((element) => element === 7));
console.log(myArray.find((element) => element === 70));

// Array.includes()
console.log('\nArray.includes()');
console.log(myArray.includes(8));
console.log(myArray.includes(88));
