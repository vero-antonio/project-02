const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');


module.exports.login = (req, res, next) => {
    res.render('session/login');
  }
  
module.exports.doLogin = (req, res, next) => {
    passport.authenticate(`${req.params.provider}-auth`, (error, user) => {
      if(error){
        console.log({ error })
        next(error);
      } else {
        req.login(user, (error) => {
          if (error){ 
            next(error);
          } else {
            res.redirect('/events');
          }
        });
      } 
    })(req, res, next);
  }

  module.exports.delete = (req, res, next) => {
    req.logout();
    res.redirect('/session/login');
  }

  