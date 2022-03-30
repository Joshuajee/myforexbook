const express = require('express')
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const exphbs  = require('express-handlebars')({extname:"hbs"})
const appRouter = require('./routes/appRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//create an express app
const app = express();

app.enable('trust proxy');


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));


// Set security HTTP headers
app.use(helmet());
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit requests from same API
const limiter = rateLimit({
  max: 5000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});


app.use('/api', cors())
app.use('/api', limiter);


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

// view engine setup
app.engine('hbs', exphbs);
app.set('view engine', 'hbs');


app.use("/", viewRouter);
app.use("/api", appRouter);



app.get('/home', function (req, res) {
    res.render('home');
});


app.get("/ping", (req, res) => {
    console.log("hi dear")
    res.send("hi dear")    
});


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
app.use(globalErrorHandler);


//update the database hourly
require("./Cron")
  

module.exports = app;