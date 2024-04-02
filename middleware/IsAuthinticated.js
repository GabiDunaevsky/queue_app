function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth');
  }
  
  function isAuthenticatedLogin(req, res, next) {
      if (req.isAuthenticated()) {
        res.redirect('/order');
      }else{
          return next();
      }
    }
    module.exports = {isAuthenticated,isAuthenticatedLogin}; 