

module.exports.login = (req, res, next) => {
    res.render('users/login');
  }
  
module.exports.doLogin = (req, res, next) => {
    passport.authenticate(`${req.params.provider}-auth`, (error, user) => {
      if(error){
        console.log({ error })
        next(error);
      } else {
        req.login(user, (error) => {
          console.log({ user });
          if (error){ 
            next(error);
          } else {
            res.redirect('/users/home');
          }
        });
      } 
    })(req, res, next);
  }