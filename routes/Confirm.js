const express = require('express');
const router = express.Router();
const confirmController = require('../controller/ConfirmPageController');

router.route('^/$|/confirm(.html)?')
.post(confirmController.handleNewQueue,(req, res) => {
});

module.exports = router;