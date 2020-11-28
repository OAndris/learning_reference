// Extending a built-in data type with custom functionality:
console.log("Adding the 'lastYear' method to the built-in Date object:");
const myDate = new Date('1990-10-17');
console.log('myDate.lastYear before:', myDate.lastYear);
Date.prototype.lastYear = function () {
    return this.getFullYear() - 1;
};
console.log('myDate.lastYear after:', myDate.lastYear, myDate.lastYear());

// Overwriting a built-in data type's functionality:
console.log("\nOverwriting the built-in 'map' method of Array:");
const myArray = [1, 2, 3];
Array.prototype.map = function () {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        arr.push(`${this[i]} bunny`);
    }
    return arr;
};
console.log(myArray.map());
