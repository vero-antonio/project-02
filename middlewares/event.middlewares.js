
module.exports.isValidDate = (req, res, next) => {
  if (req.body.dateStart != null && req.body.dateEnd != null && req.body.dateStart > req.body.dateEnd ) {
    res.render("events/create", {
      event: req.body,
      errors: {
        dateStart: 'The event must start before ending!!',
        dateEnd: 'The event must start before ending!!'
      }
    });
  } else {
    next();
  }
}