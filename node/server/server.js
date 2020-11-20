const express = require('express');

const app = express(); // instantiate an Express server

app.use(express.static(__dirname)); // serve a static file

const server = app.listen(3000, () => {
    console.log(`Server is listening on port ${server.address().port}`);
}); // start the Express server, listening for requests on a specified port

// insert data into HTML using jQery (and bind to certain events)
