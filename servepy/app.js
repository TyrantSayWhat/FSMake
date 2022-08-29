const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const keywords = require('./caller')


// const path = require("path")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/images",express.static(path.join("src/backend/images")));
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//categories
app.use(express.static(__dirname + '/public'));
app.use("/api/keywords", keywords)
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
module.exports = app;