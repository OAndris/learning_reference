const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // instantiate an Express server

app.use(express.static(__dirname)); // serve a static file
app.use(bodyParser.json()); // using 'body-parser' as a middleware (since Express itself doesn't ship with a body parser). It will parse the JSON data received from POST requests.
app.use(bodyParser.urlencoded({ extended: false })); // using 'body-parser' as a middleware once more, this time to enable receiving the URL-encoded data sent from the frontend via POST requests.

const messages = [
    { name: 'Tim', message: 'Hi' },
    { name: 'Jane', message: 'Hello' },
];

app.get('/messages', (req, res) => {
    res.send(messages);
}); // handle GET requests sent to the specified route (with a callback that gives us access to both the request and the response)

app.post('/messages', (req, res) => {
    messages.push(req.body);
    res.sendStatus(200);
});

const server = app.listen(3000, () => {
    console.log(`Server is listening on port ${server.address().port}`);
}); // start the Express server, listening for requests on a specified port
