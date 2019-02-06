const Event = require('../models/event.model');

module.exports.viewEvent = (req, res, next) => {
  res.render('events/event');
}

