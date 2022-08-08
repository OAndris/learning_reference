/**
 * ----------------------
 * "Open/Closed Principle" design pattern (2nd part of SOLID):
 * ----------------------
 * Software entities (classes, functions, modules, etc.) should be open for extension, but closed for modification.
 * That is, such an entity can allow its behavior to be extended without modifying its source code.
 * In other words, each software entity should be able to handle changes to the outside code (e.g. its input types) without having to modify the software entity itself.
 * Basically, instead of changing code, you want to create new code. Break out the logic into individual software entities.
 *
 * Example:
 * Avoid creating a giant if/else or switch/case block that handles the different types of inputs in a function.
 * Instead, create a separate class for each case and define the custom functionality/behavior for each of them inside their own class, with a common interface (utilizing "polymorphism").
 * This way, the parent function doesn't need to be aware of the different input types, it just needs to call the method that all of the child components implement themselves (same name, custom behavior).
 * It results in the parent function being closed for modification while remaining open for extension.
 * It is much simpler to have a single function call in the parent function instead of a giant switch/case block. And it is also more straightforward to create a new class for a new input type, instead of finding and changing a giant switch/case block.
 *
 * Based on: "Open/Closed Principle Explained - SOLID Design Principles" by Web Dev Simplified (https://www.youtube.com/watch?v=-ptMtJAdj40)
 */

// =================================================================================================================
// Lower-level software entities implementing custom functionality with a common interface (utilizing polymorphism):
// =================================================================================================================
class Question {
    constructor(description) {
        this.description = description;
    }
}
class BooleanQuestion extends Question {
    printQuestionChoices() {
        console.log('1. True');
        console.log('2. False');
    }
}

class MultipleChoiceQuestion extends Question {
    constructor(description, options) {
        super(description);
        this.options = options;
    }
    printQuestionChoices() {
        this.options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
        });
    }
}

class TextQuestion extends Question {
    printQuestionChoices() {
        console.log('Answer: ______________________');
    }
}

class RangeQuestion extends Question {
    printQuestionChoices() {
        console.log('Minimum: _____');
        console.log('Maximum: _____');
    }
}

// =================================================================================================
// High-level code remains easy to use, simple, and open for extension, but closed for modification:
// =================================================================================================
function printQuiz(questions) {
    questions.forEach((question) => {
        console.log(question.description);
        question.printQuestionChoices(); // just call the method that implements custom behavior based on the input type (instead of creating a large switch/case block here to handle all inputs types)
        console.log('');
    });
}

const questions = [
    new BooleanQuestion('This video is useful.'),
    new MultipleChoiceQuestion('What is your favorite language?', ['HTML', 'CSS', 'JS', 'Python']),
    new TextQuestion('Describe your favorite JS feature.'),
    new RangeQuestion('What is the speed limit in your city?'),
];

printQuiz(questions);
