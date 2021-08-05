console.log('===== CLASSES.JS OUTPUT =====');

interface UserInterface {
    name: string;
    hobby: string;
    // email: string; // NOTE: since "email" is "private" in the class definition, it cannot be included in the interface (i.e. it is an implementation detail)
    // age: number; // NOTE: since "age" is "protected" in the class definition, it cannot be included in the interface (i.e. it is an implementation detail)
    register(): void;
    payInvoice(): void;
}

class User implements UserInterface {
    public name: string; // "public" properties are accessible also from outside the class
    hobby: string;
    private email: string; // "private" properties are only accessible within the class itself
    protected age: number; // "protected" properties are only accessible within the class and its subclasses

    constructor(name: string, hobby: string, email: string, age: number) {
        this.name = name;
        this.hobby = hobby;
        this.email = email;
        this.age = age;

        console.log('User created: ' + this.name);
    }

    public register() {
        console.log(this.name + ' is now registered.');
    }

    payInvoice() {
        console.log(this.name + ' paid invoice.');
    }
}

class Member extends User {
    id: number;

    constructor(id: number, name: string, hobby: string, email: string, age: number) {
        super(name, hobby, email, age);
        this.id = id;
    }
}

let john = new User('John Doe', 'cooking', 'jdoe@gmail.com', 34);
let mike: User = new Member(1, 'Mike Smith', 'reading', 'mike@gmail.com', 42);

console.log(john.hobby);
console.log(mike.hobby);
mike.payInvoice();
