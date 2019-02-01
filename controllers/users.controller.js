const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Event = require('../models/event.model');
// const passport = require('passport');

module.exports.categories = (req, res, next) => {
  res.render('users/categories');
}

module.exports.home = (req, res, next) => {
  res.render('session/home');
}

module.exports.createEvent = (req, res, next) => {
  res.render('users/create-event');
}

module.exports.doCreateEvent = (req, res, next) => {
  // const event = new Event(req.body);
  // console.log(event);
  // event.save()
  //   .then((event) => { res.redirect('/home')});
  res.redirect('/home')
}
