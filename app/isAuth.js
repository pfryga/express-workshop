module.exports = function(req, res, next) {
    if(!req.user) {
        // res.sendStatus(403);
        next();
    } else {
        next();
    }
}
