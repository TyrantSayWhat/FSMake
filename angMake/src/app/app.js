const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const keywords = require('../../caller')

// const path = require("path")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/images",express.static(path.join("src/backend/images")));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
//categories
app.use("/api/keywords", keywords)


app.use(express.static(__dirname + '/dist'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

module.exports = app;