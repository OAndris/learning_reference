/**
 * ----------------------
 * "Single Responsibility Principle" design pattern:
 * ----------------------
 * All classes, functions, modules, etc. should have just a single responsibility, i.e. it should only ever have one single reason to change.
 * In other words, all of these code parts should do just a single thing, but do that well.
 * It makes it a lot easier to find, read and understand the code that needs to be changed for a specific task.
 *
 * Based on: "Single Responsibility Principle Explained - SOLID Design Principles" by Web Dev Simplified (https://www.youtube.com/watch?v=UQqY3_6Epbg&list=PLZlA0Gpn_vH9kocFX7R7BAe_CvvOCO_p9)
 */

const logMessage = require('./logger.js');

// This class is only responsible for tracking changes to calories. Logging related to logic is outsourced to a separate module.
class CalorieTracker {
    constructor(maxCalories) {
        this.maxCalories = maxCalories;
        this.currentCalories = 0;
    }
    trackCalories(calorieCount) {
        this.currentCalories += calorieCount;
        logMessage(`Recorded ${calorieCount} calories.`);
        if (this.currentCalories > this.maxCalories) {
            logMessage('Max calories exceeded!');
        }
    }
}

const calorieTracker = new CalorieTracker(2000);
calorieTracker.trackCalories(500);
calorieTracker.trackCalories(1000);
calorieTracker.trackCalories(700);
