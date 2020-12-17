const num = 5;
console.log(num);

// If - else if - else:
if (num > 5) {
    console.log('higher than 5');
} else if (num > 2) {
    console.log('higher than 2, but not higher than 5');
} else {
    console.log('lower than, or equal to 2');
}

// Ternary operator:
num > 10 ? console.log('higher than 10') : console.log('lower than, or equal to 10');

// Nesting ternary operators inside ternary operators is also possible, but not recommended:
num > 5
    ? console.log('higher than 5')
    : num > 2
    ? console.log('higher than 2, but not higher than 5')
    : console.log('lower than, or equal to 2');
