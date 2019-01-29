// const createError = require('http-errors');
// const mongoose = require('mongoose');
// const User = require('../models/user.model');
const passport = require('passport');


module.exports.login = (req, res, next) => {
  res.render('users/login');
}

module.exports.createWithIDPCallback = (req, res, next) => {
  passport.authenticate(`${req.params.provider}-auth`, (error, user) => {
    if(error){
      next(error);
    } else {
      req.login(user, (error) => {
        if (error){ 
          next(error);
        } else {
          res.render('users/prueba');
        }
      });
    } 
  })(req, res, next);
}
