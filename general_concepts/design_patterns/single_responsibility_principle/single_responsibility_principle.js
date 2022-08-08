/**
 * ----------------------
 * "Single Responsibility Principle" design pattern (1st part of SOLID):
 * ----------------------
 * Software entities (classes, functions, modules, etc.) should have just a single reason to change.
 * That is, an entity should implement logic for a single task only.
 * If it needs to perform more than one task, then the logic corresponding to those other tasks should be outsourced into a new entity that handles just that logic (and can be called/used wherever it's needed).
 * Following this principle significantly improves maintainability and readability, makes tests more straightforward, and even make it easier to review (in source control) what part of the codebase has changed.
 *
 * Based on: "Single Responsibility Principle Explained - SOLID Design Principles" by Web Dev Simplified (https://www.youtube.com/watch?v=UQqY3_6Epbg&list=PLZlA0Gpn_vH9kocFX7R7BAe_CvvOCO_p9)
 */

// Logging-related logic is outsourced to a separate module. If the logger needs to be changed, only the code of that module changes, the CalorieTracker class remains the same.
const logMessage = require('./logger.js');

// This class is only responsible for tracking changes to calories. And the only reason to change its code is if the tracking-related logic itself changes.
class CalorieTracker {
    constructor(maxCalories) {
        this.maxCalories = maxCalories;
        this.currentCalories = 0;
    }
    trackCalories(calorieCount) {
        this.currentCalories += calorieCount;
        logMessage(`Recorded ${calorieCount} calories.`); // the logger is called here but implemented in its own module
        if (this.currentCalories > this.maxCalories) {
            logMessage('Max calories exceeded!');
        }
    }
}

const calorieTracker = new CalorieTracker(2000);
calorieTracker.trackCalories(500);
calorieTracker.trackCalories(1000);
calorieTracker.trackCalories(700);
