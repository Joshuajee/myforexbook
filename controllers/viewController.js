const catchAsync = require("../utils/catchAsync");
const Symbol = require("../model/symbols");

exports.landPage = catchAsync(async(req, res, next) => {

    const symbol = await Symbol.distinct("name");

    res.render('home', {symbol});

});


exports.getSentiments = catchAsync(async (req, res, next) => {

    const { page } = req.query;
    const { symbol } = req.params;

    const data = await Symbol.find({name: symbol.toUpperCase()}).skip(curentPage - 1).limit(dataPerPage).sort("-timeStamp");

    const total = await Symbol.countDocuments({name: symbol.toUpperCase()});

    res.render('symbol', {data, symbol, page, count: 20, total });


});

exports.getSentiments = catchAsync(async (req, res, next) => {

    const { page } = req.query;
    const { symbol } = req.params;

    const data = await Symbol.find({name: symbol.toUpperCase()}).skip(curentPage - 1).limit(dataPerPage).sort("-timeStamp");

    const total = await Symbol.countDocuments({name: symbol.toUpperCase()});

    res.render('symbol', {data, symbol, page, count: 20, total });


});


exports.getReactApp = catchAsync(async (req, res, next) => {

    res.sendFile("./../public/")

});