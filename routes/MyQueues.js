const auth = require('../middleware/IsAuthinticated');
const express = require('express');
const router = express.Router();
const myQueuesController = require('../controller/MyQueuesController');

router.route('^/$|/myQueues(.html)?')
.get(auth.isAuthenticated, myQueuesController.getAllFuter)
.post(myQueuesController.deleteQueue);

module.exports = router;