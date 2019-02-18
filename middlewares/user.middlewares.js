module.exports.haveInterests = (req, res, next) => {
    if(!req.user || req.user.interests.length > 2){
        next();
    } else {
        res.redirect('/profile');
    }
}

module.exports.isAuthenticated = (req, res, next) => {
   if (req.isAuthenticated()){
       next();
   } else {
       res.status(401)
       res.redirect('/');
   }
}
