const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../middleware/IsAuthinticated');
const confirmController = require('../controller/ConfirmPageController');

router.get('^/$|/confirm(.html)?',auth.isAuthenticated,confirmController.confirmQueue);

module.exports = router;