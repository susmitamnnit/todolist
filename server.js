const express = require("express");
const app = express();
var http = require('http').Server(app);
const bodyParser = require("body-parser");
const jwt = require('./_helper/jwt');




const errorHandler = require('./_helper/error-handler');
const cors = require("cors");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());
app.use(errorHandler);


app.use('/users', require('./users/user.controller'));
app.use('/todolist',require('./todotask/todo.controller'));





app.get('/', (req, res) => {
    res.send("hello World !!!");
})



const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;

var server = http.listen(port, function () {
    console.log("server started listen on :" + port)
});



