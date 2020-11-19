const fs = require('fs');

//====================================
// Reading data from file:
//====================================
// Option 1:
const data1 = require('./data.json');
console.log(data1);

// Option 2:
fs.readFile('./data.json', 'utf-8', (err, data) => {
    const data2 = JSON.parse(data);
    console.log(data2);
});

//====================================
// Reading directory:
//====================================
fs.readdir('C:/Users', (err, data) => {
    console.log(data);
});

//====================================
// Writing data to file:
//====================================
const dataToWrite = { name: 'Andris' };
fs.writeFile('generated.json', JSON.stringify(dataToWrite), (err) => {
    console.log('Completed.', err ? err : '');
});
