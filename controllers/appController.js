const catchAsync = require("../utils/catchAsync");
const Symbol = require("../model/symbols");

exports.getAllSymbols = catchAsync(async(req, res, next) => {

    const symbol = await Symbol.distinct("name");

    res.status(200).json({
        status: "success",
        data: symbol
    })

});

exports.getSentiments = catchAsync(async (req, res, next) => {

    const { symbol, start, count  } = req.params;

    const data = await Symbol.find({name: symbol.toUpperCase()}).skip(parseInt(start)).limit(parseInt(count)).sort("-timeStamp");

    const total = await Symbol.countDocuments({name: symbol.toUpperCase()});

    res.status(200).json({
        status: 'success',
        data: data,
        total: total
    });

});
