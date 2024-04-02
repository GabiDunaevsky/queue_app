const auth = require('../middleware/IsAuthinticated');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');


router.get('^/$|/auth(.html)?',auth.isAuthenticatedLogin, (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'view', 'login.html'));
});

module.exports = router;