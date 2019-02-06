const Event = require('../models/event.model');

module.exports.viewEvent = (req, res, next) => {
  res.render('events/event');
}

module.exports.createEvent = (req, res, next) => {
  res.render('events/create-event');
}

module.exports.doCreateEvent = (req, res, next) => {
  console.log(req.body);
  const eventBody = req.body;
  console.log('file', req.file);
  console.log('files', req.files);
  if ( req.file ) {
    eventBody.picture = req.file.secure_url;
  }
  console.log({ eventBody });
  const event = new Event(eventBody);

  event.save()
    .then((event) => { res.redirect('/events/event')});
}
