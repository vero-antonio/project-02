const mongoose = require('mongoose');
const User = require('../models/user.model');
const Event = require("../models/event.model");
const FB_EMAILS = ["carlos@example.org"];
const MEETUP_KEY = process.env.MEETUP_KEY ;
const meetup = require('meetup-api');
const assert = require('assert');
const axios = require('axios');
const constants = require("../constants");
const faker = require("Faker");
require('../configs/db.config');
const userArr = [];
// const eventsArr = [];

// function addDays(date, days) {
//   var result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result;
// }

// // Build users
// axios.get('https://api.meetup.com/find/upcoming_events?photo-host=public&page=20&sig_id=242883568&sig=f8480669b4bdb7a8a65a625a443308e3204c26c7')
//   .then(function (response) {
//     // var mydate = new Date(response.data.events[0].local_date);
//     // console.log(typeof(mydate));
//     // console.log(mydate)
//     // console.log(response.data.events[0].local_date);
//     for(var i = 0; i < response.data.events.length; i += 1){
//       if(response.data.events[i].venue && new Date(response.data.events[i].local_date) > Date.now()){
//         const event = new Event({
//           name: response.data.events[i].name,
//           dateRange: {
//             start: new Date(response.data.events[i].local_date),
//             end: new Date(addDays(response.data.events[i].local_date, 1)),
//           },
//           location:{
//             coordinates: [response.data.events[i].venue.lat, response.data.events[i].venue.lon],
//           },
//           description: response.data.events[i].description,
//           owner: "5c58a9aef90476affd9e95ae",
//           interests: constants.CATEGORIES[Math.floor(Math.random() * Math.floor(constants.CATEGORIES.length))].id,
//           maxUsers: Math.floor(Math.random() * Math.floor(1000)),
//           direction: response.data.events[i].venue.address_1
//         });
//         eventsArr.push(event);
//       }  
//     }
//     Event.insertMany(eventsArr)
//       .then((events) => {
//         console.log({events});
//         mongoose.connection.close();
//       })
//       .catch((error) => {
//         console.log({error});
//         mongoose.connection.close();
//       })
//   })
//   .catch(function (error) {
//     console.log(error);
//     mongoose.connection.close();
//   });

<<<<<<< HEAD
for (var i = 0; i < 20; i++){
  const user = new User({
    name: faker.Name.findName(),
    email: faker.Internet.email(),
    photo: faker.Image.imageUrl(),
    interests: constants.CATEGORIES[Math.floor(Math.random() * Math.floor(constants.CATEGORIES.length))].id,
  });
  userArr.push(user);
}
User.insertMany(userArr)
  .then((users) => {
    console.log({users});
    mongoose.connection.close();
=======
Event.deleteMany({}).then(console.log);

// Build users
axios.get('https://api.meetup.com/find/upcoming_events?photo-host=public&page=20&sig_id=242883568&sig=f8480669b4bdb7a8a65a625a443308e3204c26c7')
  .then(function (response) {
    for(var i = 0; i < response.data.events.length; i += 1){
      if(response.data.events[i].venue && new Date(response.data.events[i].local_date) > Date.now()){
        const event = new Event({
          name: response.data.events[i].name,
          dateRange: {
            start: (new Date(response.data.events[i].local_date)),
            end: (new Date(addDays(response.data.events[i].local_date, 1))),
          },
          location:{
            coordinates: [response.data.events[i].venue.lat, response.data.events[i].venue.lon],
          },
          description: response.data.events[i].description,
          owner: "5c58a9aef90476affd9e95ae",
          interests: [constants.CATEGORIES[Math.floor(Math.random() * Math.floor(constants.CATEGORIES.length))].id,constants.CATEGORIES[Math.floor(Math.random() * Math.floor(constants.CATEGORIES.length))].id,constants.CATEGORIES[Math.floor(Math.random() * Math.floor(constants.CATEGORIES.length))].id],
          maxUsers: Math.floor(Math.random() * Math.floor(1000)),
          picture:'https://source.unsplash.com/random',
          direction: response.data.events[i].venue.address_1
        });
        eventsArr.push(event);
      }  
    }
    Event.insertMany(eventsArr)
      .then((events) => {
        console.log({events});
        mongoose.connection.close();
      })
      .catch((error) => {
        console.log({error});
        mongoose.connection.close();
      })
>>>>>>> ddffcbb93e825f14d6f27d3d8d255fffb443edc8
  })
  .catch((error) => {
    console.log({error});
    mongoose.connection.close();
  })



// User.create(users)
//   .then(users => {
//     mongoose.connection.close();
//   })
//   .catch(error => {
//     console.error(error);
//     mongoose.connection.close();
//   })

// call meetup api 
console.log('End seeds')
