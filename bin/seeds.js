const mongoose = require('mongoose');
const User = require('../models/user.model');
const Event = require("../models/event.model");
const Schedule = require("../models/schedule.model");
const axios = require('axios');
const constants = require("../constants");
const faker = require("Faker");
require('../configs/db.config');

const userArr = [];
const eventsArr = [];
const schedulesArr = [];
const cat = constants.CATEGORIES;
const ownersArr = constants.OWNERS; 

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getRandomNum(numMax) {
  return Math.floor(Math.random() * Math.floor(numMax));
}


// Event.deleteMany({}).then(console.log);
// User.deleteMany({}).then(console.log);
// Schedule.deleteMany({}).then(console.log);

// Build events
axios.get('https://api.meetup.com/find/upcoming_events?photo-host=public&page=40&sig_id=252734794&lon=40.4172&lat=-3.7035&sig=d1634a0481f830a0c9b6f72d28ba26ec0f82fa90')
.then(function (response) {
    for(var i = 0; i < response.data.events.length; i += 1){
      if(response.data.events[i].venue && new Date(response.data.events[i].local_date) > Date.now()){
        const event = new Event({
          name: response.data.events[i].name,
          dateRange: {
            start: (new Date(response.data.events[i].local_date + ' ' + response.data.events[i].local_time)),
            end: (new Date(addDays((response.data.events[i].local_date + ' ' + response.data.events[i].local_time), 1))),
          },
          location:{
            coordinates: [response.data.events[i].venue.lat, response.data.events[i].venue.lon],
          },
          description: response.data.events[i].description,
          owner: ownersArr[getRandomNum(ownersArr.length)],
          interests: [cat[getRandomNum(cat.length)].id,cat[getRandomNum(cat.length)].id,cat[getRandomNum(cat.length)].id],
          maxUsers: getRandomNum(200),
          picture:`https://res.cloudinary.com/ddby3wqlo/image/upload/v1550223768/event-pics/E${i + 1}.jpg`,
          direction: response.data.events[i].venue.address_1
        });
        eventsArr.push(event);
      }  
    }
    Event.insertMany(eventsArr)
      .then((events) => {

        // Build users  
        for (var i = 0; i < 20; i++){
          const user = new User({
            name: faker.Name.findName(),
            email: faker.Internet.email(),
            photo: `https://res.cloudinary.com/ddby3wqlo/image/upload/v1550220868/profiles/P${i + 1}.jpg`,
            interests: [cat[getRandomNum(cat.length)].id,cat[getRandomNum(cat.length)].id,cat[getRandomNum(cat.length)].id],
          });
          userArr.push(user);
        }

        User.insertMany(userArr)
          .then((users) => {

            // Add users to events (build Schedules)  
            for (let i = 0; i < eventsArr.length; i++){
              const usersPositions = [];
              for (let j = 0; j < getRandomNum(eventsArr[i].maxUsers + 1); j++){  
                const position = getRandomNum(userArr.length);
                if (!usersPositions.includes(position)) {
                  const schedule = new Schedule({
                    event: eventsArr[i].id,
                    user: userArr[position].id 
                  });
                  usersPositions.push(position);
                  schedulesArr.push(schedule);
                }
              }
            }
  
            Schedule.insertMany(schedulesArr)
              .then(schedules => {
                mongoose.connection.close();
              })
              .catch((error) => {
                console.log({error});
                mongoose.connection.close();
              })

        })
          .catch((error) => {
            console.log({error});
            mongoose.connection.close();
          })

      })
      .catch((error) => {
        console.log({error});
        mongoose.connection.close();
      })
  })
  .catch((error) => {
    console.log({error});
    mongoose.connection.close();
  })

console.log('End seeds')
