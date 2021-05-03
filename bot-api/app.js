//Prebuilt modules
var express = require('express');
var path = require('path');

// Initiating app
var app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Primary Router
app.use('/api/dialogflow',require('./server/routers/dialogflow'));

// Router for fullfillment
app.use('/api/webhook',require('./server/routers/fulfillment'));

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


/*
set GOOGLE_APPLICATION_CREDENTIALS=D:\KTERN-Bot\Bot\KTick\bot-api\ai-avinash-fydk-4f42d3b1acf7.json
*/