const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../middleware/IsAuthinticated');

router.get('^/$|/queue(.html)?',auth.isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'view', 'queue.html'));
});

module.exports = router;