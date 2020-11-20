const express = require('express');

const app = express(); // instantiate an Express server

app.use(express.static(__dirname)); // serve a static file

const messages = [
    { name: 'Tim', message: 'Hi' },
    { name: 'Jane', message: 'Hello' },
];

app.get('/messages', (req, res) => {
    res.send(messages);
}); // handle GET requests sent to the specified route (with a callback that gives us access to both the request and the response)

const server = app.listen(3000, () => {
    console.log(`Server is listening on port ${server.address().port}`);
}); // start the Express server, listening for requests on a specified port
