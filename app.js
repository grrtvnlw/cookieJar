var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { JSONCookie } = require('cookie-parser');
const { send } = require('process');
const { ok } = require('assert');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('welcome to cookie-ville')
});

const cookieData = 'test=test123';
corsOption = {
  origin: ['http://localhost:3001', 'http://localhost:3001/protectedRoute'],
  credentials: true,
}

let validCookies = {};

// accepts route param and generates cookie with route param as cookie name
app.get('/giveCookie/:route', cors(corsOption),  (req, res) => {
  validCookies[req.params.route] = cookieData;
  res.cookie(`${req.params.route}`, cookieData)
  res.set('Content-Type', 'text/html')
  res.json(`${req.params.route} 🍪`)
})

// validates if user has cookie with task param as its name
app.get('/protectedRoute/:route', cors(corsOption), (req, res) => {
  if (req.cookies[req.params.route] && req.cookies[req.params.route] === validCookies[req.params.route]
    ) {
    res.json('Access Granted');
  } else {
    res.json('Access Denied');
  }
})

// clears the cookie with the passed in route param
app.get('/clearCookies/:route', cors(corsOption), (req, res) => {
  delete validCookies[req.params.route]
  res.clearCookie(req.params.route)
  res.send();
})


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
  res.render('error');
});

module.exports = app;
