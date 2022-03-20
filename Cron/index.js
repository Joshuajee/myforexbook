const axios = require('axios')
const cron = require('node-cron')
const Symbol = require("../model/symbols")



cron.schedule("0 * * * *", async () => {

  try {

    console.log("cron activated")

    const loginUrl = `https://www.myfxbook.com/api/login.json?email=${process.env.EMAIL}&password=${process.env.PASSWORD}`;

    const myfxbookResponse = await axios.get(loginUrl);

    if(myfxbookResponse.data.error) return;

    const dataUrl = "https://www.myfxbook.com/api/get-community-outlook.json?session=" + myfxbookResponse.data.session
    
    const data = await axios.get(dataUrl);

    if(data.data.error) return;

    const promises = data.data.symbols.map(async element => {

      const symbolsObj = new Symbol();

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
      symbolsObj.date = new Date()
      symbolsObj.timeStamp = Date.now()

      return await symbolsObj.save()
    });

    await Promise.allSettled(promises)
    
    console.log("Done With No Issue")

  } catch (err) {

    console.error(err);

  }


})