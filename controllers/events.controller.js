const Event = require("../models/event.model");
const Schedule = require("../models/schedule.model");
const mongoose = require('mongoose');
const transporter = require('../configs/nodemailer.config'); 
const ics = require('ics'); 

module.exports.list = (req, res, next) => {
  const { name, lat, lng } = req.query;
  const criterial = {};

  //filter by user interests:
  criteria = {
    interests: { $in: req.user.interests }
  }

  //filter by user interests:
  if (name) {
    criterial.name = new RegExp(name, "i");
  }

  //filter by location:
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
  
  Event.find(criteria)
    .populate({ path: 'participants', populate: { path: 'user' }})
    .then(events => {
      // console.log(events);
      const eventsCoordinates = events.map(event => {
        return {
          id: event.id,
          coordinates: event.location.coordinates,
          interests: event.interests
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
        eventsCoordinates: encodeURIComponent(JSON.stringify(eventsCoordinates)),
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

const ifDatesExist = ({ start, end }, event) => (
  (start && end) &&
    (event.dateRange = {
      start: start,
      end: end
    })
) 

const ifInterestsExist = ({ interests }, event) => (interests) && (event.interests = interests)
const ifFileExists = ({ file }, event) => file && (event.picture = file.secure_url)

module.exports.doCreate = (req, res, next) => {

  const event = new Event(req.body);
  event.owner = req.user.id;

  ifCoordsExist(req.body, event)
  ifDatesExist(req.body, event)
  ifFileExists(req, event)
  ifInterestsExist(req.body, event)

  event.save()
    .then(() => res.redirect("/events"))
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("events/create", {
          event: req.body,
          ...(req.body.longitude && req.body.latitude
            ? { eventCoordinates: encodeURIComponent(JSON.stringify(event.location.coordinates))}
            : null
          ),
          errors: {
            messages: error.errors,
            ...(error.errors.dateRange ? { date: error.errors.dateRange.message } : null),
            ...(!ifCoordsExist(req.body, event) ? { location: 'Location is required' } : null),
            ...(!ifInterestsExist(req.body, event) ? { interests: 'At least 1 topic is required' } : null),
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
          
          const start = event.dateRange.start;
          const dateStartArray = [Number(start.substring(0,4)),Number(start.substring(5,7)),Number(start.substring(8,10)),Number(start.substring(11,13)),Number(start.substring(14,16))];
          const end = event.dateRange.end;
          const dateEndArray = [Number(end.substring(0,4)),Number(end.substring(5,7)),Number(end.substring(8,10)),Number(end.substring(11,13)),Number(end.substring(14,16))];
          
          let reminder = '';
          const reminderData = {
            // start: [2019, 5, 30, 6, 30],
            start: dateStartArray,
            // duration: { hours: 6, minutes: 30 },
            end: dateEndArray,
            title: event.name,
            description: event.description,
            location: 'Folsom Field, University of Colorado (finish line)',
            geo: { lat: 40.0095, lon: 105.2669 },
            //geo: { lat: event.location.coordinates[0], lon: event.location.coordinates[1] },
            categories: event.interests,
          }

          ics.createEvent(reminderData, (error, value) => {
            if (error) {
              console.log(error)
              return
            }
            reminder = value;
          });

          transporter.sendMail({
            from: '"NearBy" <veronica.celemin@gmail.com>',
            // to: req.user.email,
            to: 'veronica.celemin@gmail.com',
            subject: `Asistirás a: ${event.name}`,
            text: `Te acabas de inscribir al evento: ${event.name}! añádelo a tu calendario con el fichero adjunto.`,
            html: `/events/detail/${req.params.id}`,
            icalEvent: {
              filename: 'eventReminder.ics',
              method: 'request',
              content: reminder
            }
          })

          res.redirect(`/events/detail/${req.params.id}`)
        })
    }
  }).catch(error => next(error));
}


