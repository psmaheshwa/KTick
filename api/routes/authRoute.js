const router = require('express').Router();
const passport = require('passport');
const bunyan = require('bunyan');
const authController = require('./../controller/authController')
const config = require('./../utils/config');
const User = require('./../model/user');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
var log = bunyan.createLogger({
    name: 'KTick'
});

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});


passport.use(new OIDCStrategy({
        identityMetadata: config.creds.identityMetadata,
        clientID: config.creds.clientID,
        responseType: config.creds.responseType,
        responseMode: config.creds.responseMode,
        redirectUrl: config.creds.redirectUrl,
        allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
        clientSecret: config.creds.clientSecret,
        validateIssuer: config.creds.validateIssuer,
        isB2C: config.creds.isB2C,
        issuer: config.creds.issuer,
        passReqToCallback: config.creds.passReqToCallback,
        scope: config.creds.scope,
        loggingLevel: config.creds.loggingLevel,
        nonceLifetime: config.creds.nonceLifetime,
        nonceMaxAmount: config.creds.nonceMaxAmount,
        useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
        cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
        clockSkew: config.creds.clockSkew,
    },
    function (iss, sub, profile, accessToken, refreshToken, done) {
    // console.log(profile)
        console.log("Access Token: "+accessToken);
        User.findOne({uniqueId: profile.oid}).then((currentUser) => {
            if (currentUser) {
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                new User({
                    uniqueId: profile.oid,
                    name: profile.displayName,
                    email: profile.upn
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    }
));


router.get('/', function (req, res) {
    res.render('index', {user: req.user});
});

router.get('/account', authController.ensureAuthenticated, function (req, res) {
    // console.log(req.user);
    res.render('account', {user: req.user});
});

router.get('/login',
    function (req, res, next) {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,
                resourceURL: config.resourceURL,
                customState: 'my_state',
                failureRedirect: '/'
            }
        )(req, res, next);
    },
    function (req, res) {
        log.info('Login was called in the Sample');
        res.redirect('/api/v1');
    });


router.get('/auth/openid/return',
    function (req, res, next) {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,
                failureRedirect: '/'
            }
        )(req, res, next);
    },
    function (req, res) {
        log.info('We received a return from AzureAD.');
        res.redirect('/api/v1');
    });

router.post('/auth/openid/return',
    function (req, res, next) {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,    // required
                failureRedirect: '/'
            }
        )(req, res, next);
    },
    function (req, res) {
        log.info('We received a return from AzureAD.');
        res.redirect('/api/v1');
    });

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        req.logOut();
        res.redirect(config.destroySessionUrl);
    });
});


module.exports = router;
