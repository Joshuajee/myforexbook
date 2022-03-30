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

    const data = await Symbol.find({name: symbol.toUpperCase()})
        .skip(parseInt(start)).limit(parseInt(count)).sort("-timeStamp");

    const total = await Symbol.countDocuments({name: symbol.toUpperCase()});

    res.status(200).json({
        status: 'success',
        data: data.sort((a, b) => {
            return a.timeStamp - b.timeStamp
        }),
        total: total
    });

});


exports.getTimeSentiments = catchAsync(async (req, res, next) => {

    const { symbol, start, duration  } = req.params;

    const limit =1618376400134 
    const max = limit - 360000000


    console.log(limit, max, symbol)

    const data = await Symbol.aggregate([
        { $match: { name: symbol.toUpperCase() } },
        {$sort: { timeStamp: -1 } },
        {$limit: 300},
        {
            $group: {
              _id: "$date",
              y: { $avg : "$timeStamp" }
            }
        },
        //{$limit: 3}
        

       //{ $group: { _id: null, total: {$sum: "$course_fee" }}} 
    ]);

    console.log(data)


    res.status(200).json({
        status: 'success',
        data: data,
        //total: total
    });

});
