const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../middleware/IsAuthinticated');

router.get('^/$|/confirm(.html)?',auth.isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'view', 'confirm.html'));
});

module.exports = router;