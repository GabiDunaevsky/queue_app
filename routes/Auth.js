const auth = require('../middleware/IsAuthinticated');
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.route('^/$|/auth(.html)?')
.get(auth.isAuthenticatedLogin,(req, res) => {
})
.post((req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info);
    }
    else{
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        return res.status(201).json(req.user.firstName);
      });
    } 
})(req, res, next);
});

module.exports = router;