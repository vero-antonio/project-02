const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Event = require('../models/event.model');
// const passport = require('passport');

module.exports.categories = (req, res, next) => {
  res.render('users/categories');
}

module.exports.updateCategories = (req, res, next) => {

  req.user.interests = req.body.interests;

  req.user.save()
    .then(() => res.redirect('/'))
}

module.exports.home = (req, res, next) => {
  res.render('users/home');
}

module.exports.createEvent = (req, res, next) => {
  res.render('users/create-event');
}

module.exports.doCreateEvent = (req, res, next) => {
  const event = new Event(req.body);

  event.save()
    .then((event) => { res.redirect('/home')});
  // res.redirect('/home')
}
