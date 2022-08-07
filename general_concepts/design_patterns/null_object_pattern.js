/**
 * ----------------------
 * "Null Object" pattern:
 * ----------------------
 * When an object is used throughout the codebase but may not always have the actual values until a certain circumstance is met, ensure that it is initialized with the exact same object keys and some default values.
 * This object is called the "Null Object". DO NOT just use undefined or null as an initial value - use the Null Object!
 * Initializing the final object format allows us to avoid having to always check whether the actual object is already available or not, because the properties of the "Null Object" can also be safely accessed.
 *
 * Example:
 * When a user is not logged in, ensure that there is a null object similar to the User object, with default values that can be safely used throughout the codebase, even if the user may not be signed in.
 *
 * Based on: "Null Object Pattern - Design Patterns" by Web Dev Simplified (https://www.youtube.com/watch?v=D4Dja5WSZoA&list=PLZlA0Gpn_vH_CthENcPCM0Dww6a5XYC7f&index=2)
 */

class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    hasAccess() {
        return this.name === 'Bob';
    }
}

class NullUser {
    constructor() {
        this.id = -1;
        this.name = 'Guest';
    }
    hasAccess() {
        return false;
    }
}

const users = [new User(1, 'Bob'), new User(2, 'John')];

function getUser(id) {
    const user = users.find((user) => user.id === id);
    if (user == null) {
        return new NullUser();
    } else {
        return user;
    }
}

function printUser(id) {
    const user = getUser(id);
    console.log(`\nHello ${user.name}`);
    console.log(user.hasAccess() ? 'You have access!' : 'You are not allowed here.');
}

//========================================================================
printUser(1);
printUser(2);
printUser(3);
