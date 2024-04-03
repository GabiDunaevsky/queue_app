const auth = require('../middleware/IsAuthinticated');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');


router.route('^/$|/auth(.html)?')
.get(auth.isAuthenticatedLogin, (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'view', 'login.html'));
})
.post(passport.authenticate('local', {
    successRedirect: './order',
    failureRedirect: './auth',
  }));

module.exports = router;