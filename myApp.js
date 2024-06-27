let express = require('express');
let app = express();
require('dotenv').config();
var bodyParser = require('body-parser');

/*console.log("Hello World");
app.get("/", function(req,res){
    res.send("Hello Express");
});*/

app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/views/index.html");
});


app.get("/json", (req, res) => { let message = "Hello json";
    (process.env.MESSAGE_STYLE == "uppercase") ? message=message.toUpperCase() 
    : message=message; res.json({"message": message}); });


app.get('/now', (req, res, next)=>{
        req.time = new Date().toString();
    next();
}, (req, res)=>{
    res.json({
        "time": req.time
    })
});

app.get("/:word/echo", (req,res)=>{
    res.json({echo: req.params.word});
})

app.get("/name", (req,res)=>{
    let firstname = req.query.first;
    let lastname = req.query.last;
    res.json({name: firstname + " " + lastname});
})

var postHandler = function(req, res) {
	res.json({name: `${req.body.first} ${req.body.last}`});
};
app.route('/name').post(postHandler);











 module.exports = app;
