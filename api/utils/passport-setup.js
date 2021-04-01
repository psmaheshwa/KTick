const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const User = require('./../model/user');
const config = require('./config');

