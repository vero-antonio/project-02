const Event = require('../models/event.model');

module.exports.viewEvent = (req, res, next) => {
  res.render('events/event');
}

module.exports.createEvent = (req, res, next) => {
  res.render('events/create-event');
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
    //owner: ,
    //tags: , /*añadir mediante middleware*/
    maxUsers: eventBody.maxUsers
  });

  event.save()
    .then((event) => { res.redirect('/events/event')});
}
