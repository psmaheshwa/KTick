const AppError = require("../utils/AppError");
const jwt_decode = require('jwt-decode');
const User = require('./../model/user');

exports.ensureAuthenticated = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    let profile = jwt_decode(token);

    if (!profile) return res.sendStatus(403);
    else {
        let user;
        await User.findOne({uniqueId: profile.oid}).then((currentUser) => {
            if (currentUser) {
                user = currentUser;
            }
        });
        if(!user){
            await User.findOne({oid: profile.oid}).then((currentUser) => {
                if (currentUser) {
                    user = currentUser;
                }
            });
        }
        req.user = user;
    }
    next();
}

exports.restrictTo = (...roles) => {
    return ( req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError(`You're not allowed`, 403));
        }
        next();
    }
}
