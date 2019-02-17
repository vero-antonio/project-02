const moment = require('moment');
moment().format();

module.exports = (hbs) => {

  hbs.registerHelper('dateFormat', (date, options) => {
    if (date) {
      date = moment(date).locale('en').format('LLLL');
      return `<span class="h6">${date}</span>`;
    } else {
      return options.inverse(this);
    }
  })

  hbs.registerHelper('dateFromNow', (date, options) => {
    if (date) {
      date = moment(date).locale('en').fromNow();
      return `${date}`;
    } else {
      return options.inverse(this);
    }
  })

}


