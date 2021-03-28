exports.ensureAuthenticated=(req, res, next) =>{
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/api/v1/login');
}
