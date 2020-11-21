const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoConnectionData = require('./mongoConnectionData.json');

const app = express(); // instantiate an Express server

// Setup Socket.IO (requires both Express and Socket.IO to be running, instead of just Express):
const http = require('http').Server(app); // setup Socket.IO step 1/2
const io = require('socket.io')(http); // setup Socket.IO step 2/2 (now the server should be started with "http.listen" instead of just "app.listen")

app.use(express.static(__dirname)); // serve a static file
app.use(bodyParser.json()); // using 'body-parser' as a middleware (since Express itself doesn't ship with a body parser). It will parse the JSON data received from POST requests.
app.use(bodyParser.urlencoded({ extended: false })); // using 'body-parser' as a middleware once more, this time to enable receiving the URL-encoded data sent from the frontend via POST requests.

const dbUrl = `mongodb+srv://${mongoConnectionData.user}:${mongoConnectionData.password}@cluster0.zxgag.mongodb.net/${mongoConnectionData.dbname}?retryWrites=true&w=majority`;

const Message = mongoose.model('Message', {
    name: String,
    message: String,
});

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
}); // handle GET requests sent to the specified route (with a callback that gives us access to both the request and the response)

app.post('/messages', (req, res) => {
    const message = new Message(req.body);
    message.save((err) => {
        if (err) {
            sendStatus(500);
        }
        io.emit('message', req.body); // emit an event from the server to all clients, notifying them of a new message (sending the corresponding data)
        res.sendStatus(200);
    });
});

io.on('connection', (socket) => {
    // setup a callback for the socket 'connection' event that will let us know whenever a new user connects
    console.log('a user connected');
});

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log('MongoDB connection:', err ? err : 'success');
});

const server = http.listen(3000, () => {
    console.log(`Server is listening on port ${server.address().port}`);
}); // start the server (with Socket.IO functionality), listening for requests on a specified port
