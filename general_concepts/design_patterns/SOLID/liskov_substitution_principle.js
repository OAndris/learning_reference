/**
 * ----------------------
 * "Liskov Substitution Principle" design pattern (3rd part of SOLID):
 * ----------------------
 * Related to OOP. It says that if you have a child class that extends another class, then it should be easy to switch from using the parent class to using the child class, anywhere in your codebase, without further modifications.
 * That is, anywhere you use one type of class, you need to be able to use all of the subclasses of that class, and they should work just fine.
 *
 * Example:
 * If Square is a subclass of Rectangle and both have a method to calculate the area (Square can simply inherit the method from Rectangle),
 * plus there is a function that increases the width of any rectangle, then it already violates the Liskov Substitution Principle.
 * This is because increasing the width of a 5x5 Rectangle by 1 would results in a 6x5 Rectangle, with an area of 30,
 * while increasing the width of a 5x5 Square by 1 would result in a 6x6 Square, with an area of 36.
 * Therefore, while an 5x5 square should be equal to a 5x5 rectangle, they do behave differently and therefore cannot be substituted with each other.
 *
 * Based on: "Liskov Substitution Principle Explained - SOLID Design Principles" by Web Dev Simplified (https://www.youtube.com/watch?v=dJQMqNOC4Pc&list=PLZlA0Gpn_vH9kocFX7R7BAe_CvvOCO_p9&index=4)
 */

// NOTE: this example violates the Liskov Substituion Principle.

class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    setWidth(width) {
        this.width = width;
        this.height = width;
    }
    setHeight(height) {
        this.height = height;
        this.width = height;
    }
}

function increaseRectangleWidth(rectangle) {
    rectangle.setWidth(rectangle.width + 1); // if Square is a child class of Rectangle, then this line of code violates the Liskov Substitution Principle, because it returns different results for the same 5x5 Rectangle (30) and 5x5 Square (36)
}

const rectangle1 = new Rectangle(10, 2);
const rectangle2 = new Rectangle(5, 5);
const square = new Square(5, 5);

increaseRectangleWidth(rectangle1);
increaseRectangleWidth(rectangle2);
increaseRectangleWidth(square);

console.log(rectangle1.area());
console.log(rectangle2.area());
console.log(square.area());
