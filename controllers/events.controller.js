const Event = require("../models/event.model");
const Schedule = require("../models/schedule.model");
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
    .populate({ path: 'events', populate: { path: 'event' }})
    .then(events => {

      const eventsCoordinates = events.map(event => {
        return {
          id: event.id,
          coordinates: event.location.coordinates
        }
      });
      events.forEach(event => {
        if (event.schedule && event.schedule.participants) {
          event.numParticipants = event.schedule.participants.length
        } else {
          event.numParticipants = 0;
        }
      })

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
    .populate({ path: 'participants', populate: { path: 'user' }})
    .then(event => {
      res.render("events/detail", { event })
    })
    .catch(err => next(err));
};

module.exports.create = (req, res, next) => {
  res.render("events/create");
};


const ifCoordsExist = ({ longitude, latitude }, event) => (
  (longitude && latitude) &&
    (event.location = {
      type: 'Point',
      coordinates: [latitude, longitude]
    })
) 

// const ifDatesExist = ({ start, end }, event) => (
//   (start && end) &&
//     (event.dateRange = {
//       start: start,
//       end: end
//     })
// ) 

const ifInterestsExist = ({ interests }, event) => (interests) && (event.interests = interests)
const ifFileExists = ({ file }, event) => file && (event.picture = file.secure_url)

module.exports.doCreate = (req, res, next) => {

  const event = new Event(req.body);
  event.owner = req.user.id;

  ifCoordsExist(req.body, event)
  //ifDatesExist(req.body, event)
  ifFileExists(req, event)
  ifInterestsExist(req.body, event)

  event.save()
    .then(() => res.redirect("/events"))
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("events/create", {
          event: req.body,
          errors: {
            messages: error.errors,
            location: 'Location is required',
            interests: 'At least 1 topic is required'
          } 
        });
      } else {
        next(error);
      }
    });
}

module.exports.doDelete = (req, res, next) => {
  Event.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
    .then(event => {
      if (!event) {
        next(createError(404, 'Event not found'));
      } else {
        res.redirect('/events');
      }
    })
    .catch(error => next(error));
}

module.exports.join = (req, res, next) => {
  Promise.all([
    Event.findOne({ _id: req.params.id, owner: { $ne: req.user.id } }),
    Schedule.findOne({ event: req.params.id, user: req.user.id})
  ]).then(([event, schedule]) => {
    if (!event) {
      next(createError(404, 'Event not found'));
    } else if (schedule) {
      res.redirect(`/events/detail/${req.params.id}`)
    } else {
      schedule = new Schedule({
        event: req.params.id,
        user: req.user.id
      })
      return schedule.save()
        .then(schedule => {
          res.redirect(`/events/detail/${req.params.id}`)
        })
    }
  }).catch(error => next(error));
}