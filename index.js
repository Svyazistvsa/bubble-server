const https = require('https');
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:9000/");
    res.header("Access-Control-Allow-Metods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
})
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res){
    
    res.sendFile(__dirname, '/index.html');
});

app.post("/mssg", function (req, res){
    console.log(req.body);
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9000/main.bundle.js");
    res.redirect('/');
});

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.pem'),
};

https.createServer(options, app).listen(3000, function (req, res) {
    console.log("port 3000");
});