const mongoose = require('mongoose')
const config = require("../Config/config")
const axios = require('axios')
const cron = require('node-cron')
const symbols = require("../Model/Symbols")



//set up default mongoose connection
mongoose.connect(config.DataBaseURI, {useNewUrlParser:true, useUnifiedTopology:true})

//Get the connection
const db = mongoose.connection

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


cron.schedule('0 * * * *', () => {

  console.log("cron activated")

  let loginUrl = "https://www.myfxbook.com/api/login.json?email=" + config.Email + "&password=" + config.Password

    axios.get(loginUrl).
    then(response =>{

        if(!response.data.error){

            let dataUrl = "https://www.myfxbook.com/api/get-community-outlook.json?session=" + response.data.session

            axios.get(dataUrl).then(data => {

              if(!data.data.error){

                  data.data.symbols.forEach(element => {

                      console.log(element)

                      let symbolsObj = new symbols()

                      symbolsObj.name = element.name
                      symbolsObj.shortPercentage = element.shortPercentage
                      symbolsObj.longPercentage = element.longPercentage
                      symbolsObj.shortVolume = element.shortVolume
                      symbolsObj.longVolume = element.longVolume
                      symbolsObj.longPositions = element.longPositions
                      symbolsObj.shortPositions = element.shortPositions
                      symbolsObj.totalPositions = element.totalPositions
                      symbolsObj.avgShortPrice = element.avgShortPrice
                      symbolsObj.avgLongPrice = element.avgLongPrice

                      symbolsObj.save()

                  });

              }

          })
          
      }
 
    }).catch((error) => {
        console.log("errr" + error)
    })

})