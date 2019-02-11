const mongoose = require('mongoose');
const User = require('../models/user.model');
const FB_EMAILS = ["carlos@example.org"];
require('../configs/db.config');



// Build users

const users = FB_EMAILS.map(email => {
  return {
    name: 'Carlos',
    email: email,
    interests: ['social']
  }
})

User.create(users)
  .then(users => {
    mongoose.connection.close();
  })
  .catch(error => {
    console.error(error);
    mongoose.connection.close();
  })


// call meetup api 

//mongoose.connection.close();