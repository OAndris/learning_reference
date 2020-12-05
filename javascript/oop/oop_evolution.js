/*
Object Oriented Programming (OOP)

These examples demonstrate the evolution of OOP in JavaScript:
1) "Factory functions" with "Stores"
2) "Constructor functions" with "Prototype" and the "new" keyword
3) "class" keyword (together with "new" keyword) to simulate classical OOP, but using prototypal inheritance
3+1) Using Functional Programming instead of OOP

The Four Pillars of OOP:
- "Encapsulation": properties and methods are organized in objects. Objects can interact with each other, and together they model the whole "system"
- "Abstraction": hiding the complexity from users by creating simpler interfaces (i.e. with private properties and methods, which JS doesn't have yet)
- "Inheritance": by inheriting from other classes, we avoid duplications, keep the code DRY and also save memory space
- "Polymorphism": the same method can be called on different objects and act differently (shared methods can be reused and customized)

Source of example: https://www.udemy.com/course/advanced-javascript-concepts/
*/

// ==============================================================================
// 1) "Factory functions" and "stores":
// ==============================================================================
const elfFunctionStore = {
    // A "store" is an object containing reusable functionality
    attack() {
        console.log(`${this.name} attacks with ${this.weapon}`);
    },
};
function createElf(name, weapon) {
    // A "factory function" is a function that can generate a custom object (based on in input parameters)
    let newElf = Object.create(elfFunctionStore);
    newElf.name = name;
    newElf.weapon = weapon;
    return newElf;
}
const peter1 = createElf('Peter 1', 'stones');
peter1.attack();
console.log(peter1.name, peter1.weapon);

// ==============================================================================
// 2) "Constructor functions", "prototype" and the "new" keyword:
// ==============================================================================
function Elf1(name, weapon) {
    this.name = name;
    this.weapon = weapon;
}
Elf1.prototype.attack = function () {
    console.log(`${this.name} attacks with ${this.weapon}`);
};
const peter2 = new Elf1('Peter 2', 'stones');
peter2.attack();
console.log(peter2.name, peter2.weapon);

// ==============================================================================
// 3) "Class" keyword (since ES6) and the "new" keyword (it is just syntactic sugar to look more like classical OOP, but in the background, it still uses prototypal inheritance):
// ==============================================================================
class Elf2 {
    constructor(name, weapon) {
        this.name = name;
        this.weapon = weapon;
    }
    attack() {
        console.log(`${this.name} attacks with ${this.weapon}`);
    }
}
const peter3 = new Elf2('Peter 3', 'stones');
peter3.attack();
console.log(peter3.name, peter3.weapon);

// ==============================================================================
// 3+1) Using Functional Programming instead of OOP:
// ==============================================================================
function getAttack(character) {
    const attack = () => {
        console.log(`${character.name} attacks with ${character.weapon}`);
    };
    return Object.assign({}, character, { attack: attack });
}
function Elf(name, weapon, type) {
    let elf = {
        name,
        weapon,
        type,
    };
    return getAttack(elf);
}
const legolas = Elf('Legolas', 'bow', 'wooden');
legolas.attack();
console.log(legolas.name, legolas.weapon);
