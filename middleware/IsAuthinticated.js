  function isAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }else{
        return res.status(200).json({error: 'Not authorized'});
      }
  };
  
  function isAuthenticatedLogin(req, res, next) {
      if (req.isAuthenticated()) {
        return res.status(200).json({status: 'connected'});
      }else{
          return next();
      }
    }
    module.exports = {isAuthenticated,isAuthenticatedLogin}; 