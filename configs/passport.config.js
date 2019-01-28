const User = require('../models/user.model');
const FBStrategy = require('passport-facebook').Strategy;
const passport = require('passport');

passport.serializeUser((user, next) => {
  next(null, user._id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then(user => {
      next(null, user);
    })
    .catch(error => next(error));
});

passport.use('facebook-auth', new FBStrategy({
  clientID: process.env.FB_AUTH_CLIENT_ID || 'todo',
  clientSecret: process.env.FB_AUTH_CLIENT_SECRET || 'todo',
  callbackURL: process.env.FB_AUTH_CB || '/sessions/facebook/cb',
  profileFields: ['displayName', 'emails']
}, authenticateOAuthUser));

function authenticateOAuthUser(accessToken, refreshToken, profile, next) {
  let socialId = `${profile.provider}Id`;
  User.findOne({ [`social.${socialId}`]: profile.id })
    .then(user => {
      if (user) {
        next(null, user);
      } else {
        user = new User({
          //buscar cómo sacar la foto de fb
          name: profile.displayName,
          email: profile.emails[0].value,
          password: Math.random().toString(36).substring(7),
          social: {
            [socialId]: profile.id
          }
        })
        return user.save()
          .then(user => {
            next(null, user);
          });
      }
    })
    .catch(error => next(error));
}