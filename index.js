const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
var exphbs  = require('express-handlebars')
require("handlebars");

const config = require("./Config/config")
const symbols = require("./Model/Symbols")


//update the database hourly
require("./Cron")

//create an express app
const app = express()

//set up default mongoose connection
mongoose.connect(config.DataBaseURI, {useNewUrlParser:true, useUnifiedTopology:true})

//Get the connection
const db = mongoose.connection

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// view engine setup
app.engine('hbs', exphbs({extname:"hbs"}));
app.set('view engine', 'hbs');

app.get("/", (req, res) => {

    symbols.distinct("name", (err, symbol)=>{

        console.log(symbol)

        res.render('home', {symbol});
       
    
    })
    
    
})

app.get('/home', function (req, res) {
    res.render('home');
});

app.get("/symbol/:symbol", (req, res) => {

    symbols.find({name:req.params.symbol}, (err, data)=>{

        console.log(data)

        res.render('symbol', {data});

    }).lean()

})

app.get("/ping", (req, res) => {


    console.log("hi dear")
    res.send("hi dear")
    
})


//check if there is an environment port
const PORT = process.env.PORT || 5100

app.listen(PORT)