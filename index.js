const https = require('https');
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');  

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:9000/");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
})
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res){
    
    res.send(`<body>
    <h1>Welcome to HTTPS Server</h1>
    <br><br>
    <h3>Enter your message</h3>

    <!--  sending post request to "mssg" with 
        the message from the textarea -->
    <form action="mssg" method="post">
        <textarea name="message" id="" 
            cols="30" rows="10"></textarea>
        <button type="submit">Send</button>
    </form>
</body>`);
});

app.post("/mssg", function (req, res){
    console.log(req.body);
    res.redirect('/');
});

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.pem'),
};

https.createServer(options, app).listen(3000, function (req, res) {
    console.log("port 3000");
});