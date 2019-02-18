
module.exports = (hbs) => {

  hbs.registerHelper('hasCategories', (userCat, category, options) => {
    for ( let i = 0; i < userCat.length; i++ ) {
      if ( userCat[i] === category  ) {
        return ' selected';
      }
    }
  })

}


