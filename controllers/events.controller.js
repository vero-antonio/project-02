const Event = require('../models/event.model');
const User = require('../models/user.model');

module.exports.createEvent = (req, res, next) => {
  res.render('events/event-create');
}

module.exports.listEvent = (req, res, next) => {
  Event.find()
    .then((events) => res.render('events/event-list', { events }))
    .catch(err => next(err))
}

module.exports.viewEvent = (req, res, next) => {
  Event.findById(req.params.id)
  .then(event => res.render('events/event-detail', {event}));
}

module.exports.doCreateEvent = (req, res, next) => {
  const eventBody = req.body;
  if ( req.file ) {
    eventBody.picture = req.file.secure_url;
  }
  const event = new Event({
    name: eventBody.name,
    dateStart: eventBody.dateStart,
    dateEnd: eventBody.dateEnd,
    location: {
      type: 'Point',
      coordinates: [eventBody.longitude, eventBody.latitude]
    },
    picture: eventBody.picture, //preguntar a pablo si esto está bien guardado así
    description: eventBody.description,
    owner: req.user.id,
    //tags: , /*añadir mediante middleware*/
    maxUsers: eventBody.maxUsers
  });

  event.save()
    .then((event) => { res.redirect('/events/event-list')});
}
