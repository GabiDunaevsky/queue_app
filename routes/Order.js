const auth = require('../middleware/IsAuthinticated');
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/order(.html)?',auth.isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'view', 'order.html'));
});

module.exports = router;