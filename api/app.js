const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const authRouter = require('./routes/authRoute')
const usersRouter = require('./routes/usersRoute');
const ticketsRouter = require("./routes/ticketsRoute");
const AppError = require("./utils/AppError");


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tickets', ticketsRouter);


// app.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler);

module.exports = app;
