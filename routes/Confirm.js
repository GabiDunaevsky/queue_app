const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../middleware/IsAuthinticated');
const confirmController = require('../controller/ConfirmPageController');

router.route('^/$|/confirm(.html)?')
.get(auth.isAuthenticated,confirmController.confirmQueue)
.post(confirmController.handleNewQueue);

module.exports = router;