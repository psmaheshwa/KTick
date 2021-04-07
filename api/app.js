const express = require('express');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const cors = require('cors');
const bp = require("body-parser");

const usersRouter = require('./routes/usersRoute');
const ticketsRouter = require("./routes/ticketsRoute");
const projectRouter = require('./routes/projectRoute');


const app = express();
app.use(cors({
    origin: ['http://localhost:4200']
}));
app.use(morgan('dev'));
app.use(methodOverride());
app.use(cookieParser());
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../../public'));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tickets', ticketsRouter);
app.use('/api/v1/projects', projectRouter);

module.exports = app;
