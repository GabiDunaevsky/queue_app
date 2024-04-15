const express = require('express');
const router = express.Router();
const auth = require('../middleware/IsAuthinticated');
const hourController = require('../controller/QueueHourController');
//auth.isAuthenticated,
router.route('^/$|/queueHour(.html)?(.*)')
.get(auth.isAuthenticated,hourController.getAllAvailable);
// .post(hourController.storeHour);

module.exports = router;