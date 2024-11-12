const https = require('https');
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');  
const path = require('path');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:9000");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.options('*',(req,res) => {
    res.sendStatus(200);
});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res){
    
    res.sendFile(path.join(__dirname, '/content/soap.html'));
});

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.pem'),
};

https.createServer(options, app).listen(3000, function (req, res) {
    console.log("port 3000");
});