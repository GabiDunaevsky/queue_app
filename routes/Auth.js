const auth = require('../middleware/IsAuthinticated');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');


router.route('^/$|/auth(.html)?')

.get(auth.isAuthenticatedLogin,(req, res) => {
    console.log(req.session);
})
.post((req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      // Handle error
      return next(err);
    }
    console.log(user);
    if (!user) {
      // Authentication failed, return error message
      // return res.status(401).json({ message: 'Incorrect username or password' });
      return res.status(401).send(info);    }
     // success, perform the login
     req.login(user, (err) => {
      if (err)
        return next(err);
      
      // req.user contains the authenticated user, we send all the user info back
      return res.status(201).json(req.user.firstName);
  }); 
})(req, res, next);
});
// .post(passport.authenticate('local', {keepSessionInfo: true}), (req, res) => {
//   console.log(req.headers.origin);
//   console.log(req.session);
//   res.json({ message: 'Login successful', user: req.user });
// });

module.exports = router;