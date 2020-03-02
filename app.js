const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


//Routers
const indexRouter = require('./routes/index'); 
const apartmentRouter= require('./routes/apartments');
const loginRouter = require('./routes/login');
const countriesRouter = require('./routes/countries');
const signupRouter = require('./routes/signup'); 
const wish_listRouter = require('./routes/wish_list'); 

const app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({origin: 'http://localhost:3002', credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/', indexRouter);
app.use('/apartments',apartmentRouter);
app.use('/login',loginRouter);
app.use('/countries',countriesRouter);
app.use('/signup',signupRouter);
app.use('/wish_list',wish_listRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
