const functionsDemo = () => {
    // Ensuring numeric inputs and numeric output:
    function getSum(num1: number, num2: number): number {
        return num1 + num2;
    }

    // Ensuring no specific input type, but numeric output:
    const mySum = (num1: any, num2: any): number => {
        if (typeof num1 === 'string') {
            num1 = parseInt(num1);
        }
        if (typeof num2 === 'string') {
            num2 = parseInt(num2);
        }
        return num1 + num2;
    };

    // Ensuring string inputs and output, and making a parameter OPTIONAL
    const getName = (firstName: string, lastName?: string): string => {
        return lastName === undefined ? firstName : `${firstName} ${lastName}`;
    };

    // Ensuring no output:
    const myVoid = (myString: string): void => {
        console.log(myString);
    };

    console.log('===== FUNCTIONS.JS OUTPUT =====');
    console.log(getSum(1, 4));
    console.log(mySum('3', 5));
    console.log(getName('John'));
    console.log(getName('John', 'Doe'));
    myVoid('Void function, having no output');
};

functionsDemo();
