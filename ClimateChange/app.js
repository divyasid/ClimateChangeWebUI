var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');

var indexRouter = require('./routes/index');
var modelRouter = require('./routes/model');
var newsRouter = require('./routes/modelNews');
var dashRouter = require('./routes/dashboard'); 
var homeRouter = require('./routes/home'); 
var deforestRouter = require('./routes/deforest');
var emissionRouter = require('./routes/emission');

var helpRouter = require('./routes/help');

var globalRouter = require('./routes/globalwarming');
var seaRouter = require('./routes/sealevel');
var droughtRouter = require('./routes/drought');
var fireRouter = require('./routes/wildfire');
var fossilRouter = require('./routes/fossilfuel');
// var articlesRouter = require('/routes/articles')


// Cloud Mongo DB - start
const url = 'mongodb+srv://cmpe:cmpe@cluster0-ddt5m.mongodb.net/cmpe280?retryWrites=true&w=majority';
const db = require('monk')(url);
//const collection = db.get('All_articles')
const collection = db.get('News');
// Cloud Mongo DB - end

var app = express();

// assignment5 - start
app.use(function(req, res, next)
        {
            req.db = db;
            next();
        });
// assignment5 - end

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/articles',articlesRouter);
app.use(cookieParser());
app.use(session({
  secret: 'ssshhhh',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.use('/', homeRouter);
app.use('/dashboard', dashRouter);
app.use('/deforestation', deforestRouter); 
app.use('/emission', emissionRouter);
app.use('/fossilfuel', fossilRouter);
app.use('/home', homeRouter); 

app.use('/globalwarming', globalRouter);
app.use('/sealevel', seaRouter);
app.use('/drought', droughtRouter);
app.use('/wildfire', fireRouter);

app.use('/manageArticles', modelRouter);
app.use('/news', newsRouter);
app.use('/help', helpRouter);

// messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send(err);
});


module.exports = app;