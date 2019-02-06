//const user = require("../models/user.model");
const createError = require('http-errors');

module.exports.haveInterests = (req, res, next) => {
    if(req.user.interests && req.user.interests.length > 2){
        res.render('users/home');
    } else {
        res.redirect('/categories');
    }
}