const express = require('express');
const router = express.Router();
const auth = require('../middleware/IsAuthinticated');
const queueController = require('../controller/QueueDateController');

router.route('^/$|/queue(.html)?')
.get(auth.isAuthenticated,(req, res) => {
    console.log("passed date");
});
// .post(queueController.storesDate);

module.exports = router;