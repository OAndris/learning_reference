/*
Object Oriented Programming
(Factory functions + Stores + Constructor functions + Prototype + Class)

The Four Pillars of OOP:
- "Encapsulation": properties and methods are organized in objects. Objects can interact with each other, and together they model the whole "system"
- "Abstraction": hiding the complexity from users by creating simpler interfaces (i.e. with private properties and methods, which JS doesn't have yet)
- "Inheritance": by inheriting from other classes, we avoid duplications, keep the code DRY and also save memory space
- "Polymorphism": the same method can be called on different objects and act differently (shared methods can be reused and customized)
*/

// "Factory functions" and "stores":
const elfFunctionStore = {
    // A "store" is an object containing reusable functionality
    attack() {
        console.log('attack with ' + this.weapon);
    },
};
function createElf(name, weapon) {
    // A "factory function" is a function that can generate a custom object (based on in input parameters)
    let newElf = Object.create(elfFunctionStore);
    newElf.name = name;
    newElf.weapon = weapon;
    return newElf;
}
const peter = createElf('Peter', 'stones');
peter.attack();
console.log(peter.name, peter.weapon);
