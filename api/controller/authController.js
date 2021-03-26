const express = require("express");
const msal = require("@azure/msal-node");
const mongoose = require('mongoose');
const User = require('./../model/user');
const catchAsync = require('./catchAsync')

const config = {
    auth: {
        clientId: "1acd6cea-fdbd-427e-8249-cc35e977fb86",
        authority: "https://login.microsoftonline.com/common",
        clientSecret: ".5WCwY.OPt86aXrz5RChLKVPje3.ee.s-b",
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        },
    },
};
const pca = new msal.ConfidentialClientApplication(config);

exports.login = ("/", (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: 'http://localhost:3000/api/v1/redirect',
    };

    pca
        .getAuthCodeUrl(authCodeUrlParameters)
        .then((response) => {
            res.redirect(response);
        })
        .catch((error) => console.log(JSON.stringify(error)));
});
exports.logout = ("/", (req, res, next) => {
    // const accounts = msal.getTokenCache().getAllAccounts();
    // const account = accounts[0];
    // msal.getTokenCache().removeAccount(account);
    res.redirect(
        "https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=http%3A%2F%2Flocalhost:3000%2Fapi%2Fv1%2Fauth%2F"
    );
});

exports.redirect = ("/", (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/api/v1/redirect",
    };

    pca
        .acquireTokenByCode(tokenRequest)
        .then((response) => {
            console.log(
                "\nResponse: \n:",
                response.uniqueId,
                response.account.username,
                response.account.name
            );
            User.findOne({id:response.uniqueId}).then((currentUser) => {
                if(currentUser){
                    console.log('user is: ', currentUser);
            }else{
                    new User({
                        id:response.uniqueId,
                        name:response.account.name,
                        email:response.account.username
                    }).save().then((newUser) => {
                        console.log('created new user: ', newUser);
                    });
                }
            })
            res.send('<h1>Hello</h1>')
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
});
