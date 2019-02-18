
module.exports = (hbs) => {

  hbs.registerHelper('hasCategories', (category, userCat, options) => {
    if ( userCat.some(category) ) {
      return ' selected';
    } else {
      return options.inverse(this);
    }
  })

}


