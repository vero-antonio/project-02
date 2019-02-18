const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));
require('../helpers/event.helpers')(hbs); 
require('../helpers/date.helpers')(hbs); 
require('../helpers/topics.helpers')(hbs); 