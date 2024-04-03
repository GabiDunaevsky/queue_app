const express = require('express');
const router = express.Router();
const auth = require('../middleware/IsAuthinticated');

router.route('^/$|/queueHour(.html)?')
.get(auth.isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname,'..', 'view', 'queueHoure.ejs'));
    res.render('queueHour');
});

module.exports = router;