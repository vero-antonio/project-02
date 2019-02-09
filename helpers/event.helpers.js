module.exports = (hbs) => {
  hbs.registerHelper('isOwner', (event, user, options) => {
    if (event.owner.toString() === user.id) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
}

