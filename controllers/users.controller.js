module.exports.categories = (req, res, next) => {
  res.render('users/categories');
}

module.exports.updateCategories = (req, res, next) => {

  req.user.interests = req.body.interests;

  req.user.save()
    .then(() => res.redirect('/events'))
}


