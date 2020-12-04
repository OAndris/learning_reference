/*
JavaScript OOP using prototypal inheritance with the "class" keyword (available since ES6).
Subclasses (child classes) can be derived from (and can inherit from) a superclass (parent class).

Sources of examples:
- https://www.udemy.com/course/advanced-javascript-concepts/

"Method overriding" allows a subclass to provide a specific implementation of a method that is already provided by one of its superclasses.
The implementation in the subclass overrides (replaces) the implementation in the superclass by providing a method that has same name.
The version of a method that is executed will be determined by the object that is used to invoke it ("runtime polymorphism").
https://stackoverflow.com/questions/6885404/javascript-override-methods
https://en.wikipedia.org/wiki/Method_overriding

"Method overloading" is the ability to create multiple methods of the same name with different implementations.
Calls to an overloaded function will run a specific implementation of that function appropriate to the context of the call, allowing one function call to perform different tasks depending on context.
There is no native implementation for method overloading in JavaScript. However, it can be faked in at least 2 ways:
- by passing an object (that can hold anything) as the last argument to the method (the existence of any specific property can then be checked and handled).
- by defining the function/method with its maximum number of allowed arguments, and checking whether any of them is of type "undefined" (meaning that the argument was not passed in), then handling those which are defined.
https://stackoverflow.com/questions/456177/function-overloading-in-javascript-best-practices
*/

// Character (base) class (parent):
class Character {
    constructor(name, weapon) {
        this.name = name;
        this.weapon = weapon;
    }
    introduce() {
        console.log(`Hello! I'm ${this.name}.`);
    }
    attack() {
        this.weapon
            ? console.log(`${this.name} attacks with ${this.weapon}.`)
            : console.log(`${this.name} has nothing to attack with!`);
    }
}

// Elf subclass (child), inheriting from Character class (parent):
class Elf extends Character {
    constructor(name, weapon, type) {
        super(name, weapon); // inherit the properties and methods of the parent class
        this.type = type; // add a new, custom property
    }
    attack() {
        // Replace the functionality inherited from the parent class ("method overriding"; runtime polymorphism)
        super.attack(); // the overriden method (in the subclass) can optionally invoke (call) the superclass' method with the same name (that is being overriden)
        if (this.type) {
            console.log(`This elf is ${this.type}.`);
            super.attack(); // the implementation of this method in the superclass remains unchanged (even though its implementation in the subclass has been changed)
        }
    }
}

// Ogre subclass (child), inheriting from Character class (parent):
class Ogre extends Character {
    constructor(name, weapon, color) {
        super(name, weapon); // inherit the properties and methods of the parent class
        this.color = color; // add a new, custom property
    }
    attack() {
        // Replace the functionality inherited from the parent class ("method overriding"; runtime polymorphism)
        console.log(`${this.name}, the ogre doesn't want to attack.`);
    }
    makeFort() {
        // Add a new, custom method
        console.log(`${this.name} has just built the strongest fort in the world.`);
    }
}

// ====================================================================

// Instantiate objects from the classes.
// Although it is not via true "method overloading" (which is not available in JavaScript), all these classes can be called with either 1, 2, or 3 arguments:
const somebody = new Character('Ordinary Character');
const jane = new Character('Jane', 'two rolling pins');
const demonHunter = new Elf('Demon Hunter', 'blades', 'rather agile');
const legolas = new Elf('Legolas', 'arrows', 'very swift');
const dobby = new Elf('Dobby');
const shrek = new Ogre('Shrek', 'club', 'green');

// Using the objects we have created:
somebody.attack();
console.log('');

jane.introduce();
jane.attack();
console.log('');

demonHunter.introduce();
demonHunter.attack();
console.log('');

legolas.attack();
console.log('');

dobby.introduce();
dobby.attack();
console.log('');

shrek.attack();
shrek.makeFort();
