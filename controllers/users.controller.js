const User = require("../models/user.model");

module.exports.profile = (req, res, next) => {
  res.render("users/profile");
};

module.exports.profileUpdate = (req, res, next) => {
  let name = req.user.name;
  let email = req.user.email;
  let interests = req.user.interests;

  if ( req.body.name ) {
    name = req.body.name;
  };
  if ( req.body.emails ) {
    email = req.body.email;
  };
  if ( req.body.interests ) {
    interests = req.body.interests;
  };

  User.findByIdAndUpdate(req.user.id, {interests: interests, name: name, email: email})
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
  
}
