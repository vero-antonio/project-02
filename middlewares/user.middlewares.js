//const user = require("../models/user.model");

module.exports.haveInterests = (req, res, next) => {
    if(req.user.interests && req.user.interests.length > 0){
        res.redirect('/users/prueba');
    } else {
        res.redirect('/categories');
    }
}

module.exports.isAuthenticated = (req, res, next) => {
   if (req.isAuthenticated()){
       next();
   } else {
       res.status(401)
           .redirect('session/login');
   }
}
