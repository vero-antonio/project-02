//const user = require("../models/user.model");
const createError = require('http-errors');

module.exports.haveInterests = (req, res, next) => {
    if(req.user.interests && req.user.interests.length > 2){
        res.render('session/home');
    } else {
        res.redirect('/categories');
    }
}

module.exports.isAuthenticated = (req, res, next) => {
    console.log('user', req.user);
    console.log('auth', req.isAuthenticated());
   if (req.isAuthenticated()){
       next();
   } else {
       console.log('not authenticated')
       res.status(401)
           .redirect('session/login');
   }
}


