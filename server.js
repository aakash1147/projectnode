const express = require('express');
const mongodb = require('./app/db/connection');

var app = express();

app.listen(5000, ()=> {
    console.log("Server is running on port 5001")
});

var mainRouting = require('./app/routing/mainRouting')(app);
var userRouting = require('./app/routing/userRouting')(app);
