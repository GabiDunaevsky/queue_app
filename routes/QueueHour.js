const express = require('express');
const router = express.Router();
const auth = require('../middleware/IsAuthinticated');
const hourController = require('../controller/QueueHourController');

router.route('^/$|/queueHour(.html)?(.*)')
.get(auth.isAuthenticated,hourController.getAllAvailable);

module.exports = router;