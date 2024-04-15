const express = require('express');
const router = express.Router();
const auth = require('../middleware/IsAuthinticated');
const confirmController = require('../controller/ConfirmPageController');

router.route('^/$|/confirm(.html)?')
.get(auth.isAuthenticated,(req, res) => {
}) 
.post(confirmController.handleNewQueue,(req, res) => {
});

module.exports = router;