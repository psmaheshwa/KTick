const config = require('./utils/config');
const express = require('express');
const cookieParser = require('cookie-parser');
let expressSession = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
const morgan = require('morgan');
let MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const cors = require('cors');


const usersRouter = require('./routes/usersRoute');
const ticketsRouter = require("./routes/ticketsRoute");
const authRouter = require('./routes/authRoute');
const projectRouter = require('./routes/projectRoute');


const app = express();
app.use(cors({
    origin:[,'http://localhost:4200']
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(methodOverride());
app.use(cookieParser());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });
// app.use(function (req, res, next) {
//
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//
//     // Pass to next layer of middleware
//     next();
// });


// app.use(function(req, res, next) {
//
//     // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//     res.header("Access-Control-Allow-Origin", "*");
//     // res.header(
//     //     "Access-Control-Allow-Headers",
//     //     "Origin, X-Requested-With, Content-Type, Accept"
//     // );
//     next();
// });

if (config.useMongoDBSessionStore) {
    app.use(express.session({
        secret: 'secret',
        cookie: {maxAge: config.mongoDBSessionMaxAge * 1000},
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            clear_interval: config.mongoDBSessionMaxAge
        })
    }));
} else {
    app.use(expressSession({secret: 'keyboard cat', resave: true, saveUninitialized: false}));
}

app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../../public'));

app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});


app.use('/api/v1', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tickets', ticketsRouter);
app.use('/api/v1/projects', projectRouter);

module.exports = app;
