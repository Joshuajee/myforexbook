const express = require('express')
const mongoose = require('mongoose')
//const exphbs  = require('express-handlebars')({extname:"hbs"})


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
/*
// view engine setup
app.engine('hbs', exphbs);
app.set('view engine', 'hbs');
*/


app.get("/", (req, res) => {

    symbols.distinct("name", (err, symbol)=>{

        console.log(symbol)

        //res.render('home', {symbol});
        res.send(symbols)
    
    })
    
    
})

app.get('/home', function (req, res) {
    res.render('home');
});

app.get("/symbol/:symbol/:start", (req, res) => {

    let caption = req.params.symbol
    let start = 1 + (parseInt(req.params.start) - 1) * 20 
    let end = start + 20 - 1
    
    symbols.find({name:caption}, (err, data) => {

        console.log(data)

        //res.render('symbol', {data, caption, start, end});
        res.send("working")
        console.log(start)

    }).lean().skip(start).limit(15)

    

})

app.get("/ping", (req, res) => {


    console.log("hi dear")
    res.send("hi dear")
    
})


//check if there is an environment port
const PORT = process.env.PORT || 5100

app.listen(PORT)