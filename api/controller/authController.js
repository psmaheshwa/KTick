const AppError = require("../utils/AppError");
exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(req.user);
        return next();
    }
    res.redirect('/api/v1/login');
}

exports.restrictTo = (...roles) => {
    return(req, res, next)=> {
        if(!roles.includes(req.user.role)) {
            return next(new AppError(`You're not allowed`,403));
        }
        next();
    }
}
