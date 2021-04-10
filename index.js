const express = require('express')
const mongoose = require('mongoose')
const exphbs  = require('express-handlebars')({extname:"hbs"})


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
app.engine('hbs', exphbs);
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

app.get("/symbol/:symbol/:start", (req, res) => {

    let caption = req.params.symbol
    let page = parseInt(req.params.start)
    let dataPerPage = 20
    let start = 1 + (page - 1) * dataPerPage 
    let next = page + 1
    let notFirstPage = page !== 1
    

 
    symbols.find({name:caption}, (err, data) => {

        symbols.count({name:caption}, (err, count) => {

            let numberOfPages = Math.ceil(count / dataPerPage)

            let pages = []

            console.log(data)

            let dataLength = -1

            for(let i = 0; i < data.length; i++){

                data[i].index = start + i
                dataLength++

            }

            for(let i = 0; i < numberOfPages; i++){

                if(page === i + 1)
                    pages.push([i + 1, caption, true])
                else
                    pages.push([i + 1, caption, false])

            }

            let end = start + dataLength
            let notLastPage = page !== numberOfPages
    
            res.render('symbol', {data, caption, start, end, pages, next, notFirstPage, notLastPage});
    
            console.log("Start : ", start)
            console.log("Count : ", count)
            console.log("Number Of Pages : ", numberOfPages)
            console.log(notFirstPage)
    
        })


    }).lean().skip(start - 1).limit(dataPerPage).sort("-timeStamp")

})


app.get("/ping", (req, res) => {


    console.log("hi dear")
    res.send("hi dear")
    
})


//check if there is an environment port
const PORT = process.env.PORT || 5100

app.listen(PORT)