const User = require("../models/user.model");

module.exports.categories = (req, res, next) => {
  res.render('users/categories');
}

module.exports.updateCategories = (req, res, next) => {

  req.user.interests = req.body.interests;

  req.user.save()
    .then(() => res.redirect('/'))
}

module.exports.profile = (req, res, next) => {
  res.render("users/profile");
  console.log('esto es interests' + req.user.interests);

};

module.exports.profileUpdate = (req, res, next) => {

  // console.log('esto es interests' + req.body.interests);
  User.findByIdAndUpdate(req.user.id, {interests: req.body.interests})
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
}
