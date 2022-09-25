/**
 * ----------------------
 * "Interface Segregation Principle" design pattern (4th part of SOLID):
 * ----------------------
 * The idea is to make interfaces smaller by 'segregating' them (i.e. create small, reusable units, essentially: prefer composition over inheritance).
 * Any object/class that inherits from a base class (or implements an interface) should use ALL the properties and methods of the base class or interface.
 * Eeach of our objects/classes should only implement the information that they can actually use (i.e. no unused properties and/or methods).
 * Large base classes and/or interfaces should be broken up to smaller classes and/or interfaces that can be used separately, as required.
 *
 * Background:
 * - interfaces are used for describing the shape of an object or class, i.e. all of its properties and methods (without any actual value)
 * - every object or class that implements a specific interface has to define all of its properties and methods (the actual values)
 * - the same applies whether it's a class that extends (i.e. inherits from) a parent class or a class that implements an interface
 *
 * Benefits:
 * - cleaner code, clear use cases, no unused/unusable properties and methods
 * - more flexibility for creating new classes with custom properties and methods (small, reusable code units can be added to any new class without the inflexibility of inheritance)
 *
 * Example:
 * - see below code, where we refactor a giant base class (with many of its properties/methods not used by subclasses) into smaller pieces that can be assigned to any subclass with great flexibility
 *
 * Based on: "Interface Segregation Principle Explained - SOLID Design Principles" by Web Dev Simplified (https://www.youtube.com/watch?v=JVWZR23B_iE&list=PLZlA0Gpn_vH9kocFX7R7BAe_CvvOCO_p9&index=5)
 */

// ===============================================
// Example for INCORRECT implementation.
// The Wall and Turret classes violate the Interface Segregation Principle (because they don't use all the properties and methods of the Entity base class):
// ===============================================
class Entity {
    constructor(name, attackDamage, health) {
        this.name = name;
        this.attackDamage = attackDamage;
        this.health = health;
    }
    move() {
        console.log(`${this.name} moved`);
    }
    attack(targetEntity) {
        console.log(`${this.name} attacked ${targetEntity.name} for ${this.attackDamage} damage`);
        targetEntity.takeDamage(this.attackDamage);
    }
    takeDamage(amount) {
        this.health = amount;
        console.log(`${this.name} has ${this.health} health remaining`);
    }
}

class Character extends Entity {
    // the Character class just inherits everything from the Entity class, without doing anything extra.
}

class Wall extends Entity {
    // the Wall class has an attackDamage of zero, and it can neither move nor attack.
    constructor(name, health) {
        super(name, 0, health);
    }
    move() {
        return null;
    }
    attack() {
        return null;
    }
}

class Turret extends Entity {
    // the Turret class has a health of -1, and it can neither move nor take any damage.
    constructor(name, attackDamage) {
        super(name, attackDamage, -1);
    }
    move() {
        return null;
    }
    takeDamage() {
        return null;
    }
}

const turret = new Turret('Turret', 5);
const character = new Character('Character', 3, 100);
const wall = new Wall('Wall', 200);

turret.attack(character);
character.move();
character.attack(wall);

// ===============================================
// Example for CORRECT implementation.
// Small, simple base class and small ~interfaces (all the methods are defined separately and can be added to individual classes on their own)
// Methods that are not shared by all subclasses are added using composition (instead of inheritance), thus they only have what they actually need to implement (e.g. the Wall).
// ===============================================
class Entity {
    constructor(name) {
        this.name = name;
    }
}

const mover = {
    move() {
        console.log(`${this.name} moved`);
    },
};

const attacker = {
    attack(targetEntity) {
        console.log(`${this.name} attacked ${targetEntity.name} for ${this.attackDamage} damage`);
        targetEntity.takeDamage(this.attackDamage);
    },
};

const hasHealth = {
    takeDamage(amount) {
        this.health = amount;
        console.log(`${this.name} has ${this.health} health remaining`);
    },
};

class Character extends Entity {
    constructor(name, attackDamage, health) {
        super(name);
        this.attackDamage = attackDamage;
        this.health = health;
    }
}
Object.assign(Character.prototype, mover); // adding the "mover" method to the Character class definition
Object.assign(Character.prototype, attacker);
Object.assign(Character.prototype, hasHealth);

class Wall extends Entity {
    constructor(name, health) {
        super(name);
        this.health = health;
    }
}
Object.assign(Wall.prototype, hasHealth);

class Turret extends Entity {
    constructor(name, attackDamage) {
        super(name);
        this.attackDamage = attackDamage;
    }
}
Object.assign(Turret.prototype, attacker);

const turret = new Turret('Turret', 5);
const character = new Character('Character', 3, 100);
const wall = new Wall('Wall', 200);

turret.attack(character);
character.move();
character.attack(wall);

// ================================================================================================================
/* Example for INCORRECT implementation using interfaces (the Turret class violates the Interface Segregation Principle):
interface Entity {
    attackDamage
    health
    name

    move()
    attack()
    takeDamage(amout)
}

class Character implements Entity {
    move() {}
    attack() {}
    takeDamage() {}
}

class Turret implements Entity {
    // This Turret class implements the Entity interface, but doesn't / cannot use its move() method.
    // Therefore, it violates the Interface Segregation Principle.
    move() {
        // ERROR: Cannot move
    }
}
*/
// ================================================================================================================
