const mongoose = require('mongoose')



const Symbols = new mongoose.Schema({
    name : {type:String, default : ""},
    shortPercentage : {type:Number, default : 0},
    longPercentage :{type:Number, default : 0},
    shortVolume : {type:Number, default : 0}, 
    longVolume : {type:Number, default : 0}, 
    longPositions : {type:Number, default : 0},
    shortPositions : {type:Number, default : 0}, 
    totalPositions : {type:Number, default : 0}, 
    avgShortPrice : {type:Number, default : 0}, 
    avgLongPrice : {type:Number, default : 0},
    date : {type:Date, default : new Date()},
    timeStamp: {type:Number, default : Date.now()}
})

module.exports = mongoose.model("symbols", Symbols)