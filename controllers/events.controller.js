const Event = require("../models/event.model");
const mongoose = require('mongoose');

module.exports.list = (req, res, next) => {
  const { name, lat, lng } = req.query;
  const criterial = {};

  if (name) {
    criterial.name = new RegExp(name, "i");
  }

  if (lat && lng) {
    criterial.location = {
      $near: {
        $maxDistance: 1000,
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        }
      }
    };
  }

  Event.find(criterial)
    .then(events => {
      const eventsCoordinates = events.map(event => {
        return {
          id: event.id,
          coordinates: event.location.coordinates
      }
    });
      res.render("events/list", 
      { 
        events,
        eventsCoordinates: encodeURIComponent(JSON.stringify(eventsCoordinates))
      }
    )})
    .catch(err => next(err));
};

module.exports.details = (req, res, next) => {
  Event.findById(req.params.id)
    .then(event => res.render("events/detail", { event }))
    .catch(err => next(err));
};

module.exports.create = (req, res, next) => {
  res.render("events/create");
};

module.exports.doCreate = (req, res, next) => {

  const event = new Event(req.body);
  event.owner = req.user.id;

  if (req.body.longitude.length > 0 && req.body.latitude.length > 0) {
    event.location = {
      type: 'Point',
      coordinates: [req.body.latitude, req.body.longitude]
    }
    if (req.file) {
    event.picture = req.file.secure_url;
    }
    event.save()
      .then(event => res.redirect("/events"))
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render("events/create", {
            event: req.body,
            errors: error.errors,
          });
        } else {
          next(error);
        }
      });
  } else {
    res.render("events/create", {
      event: req.body,
      errors: {
        location: 'Location is required'
      }
    });
  }
}

module.exports.doDelete = (req, res, next) => {
  Event.findById(req.params.id).then( event => {
    if ( event.owner.toString() === req.user.id ) {

      Event.findByIdAndRemove(req.params.id)
        .then(event => {
          if (!event) {
            next(createError(404, 'Event not found'));
          } else {
            res.redirect('/events');
          }
        })
        .catch(error => next(error));

    } else {
      next(error);
    }
  })
}