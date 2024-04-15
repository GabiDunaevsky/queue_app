const express = require('express');
const router = express.Router();
const regController = require('../controller/RegisterController')

router.route('^/$|/register(.html)?')
.post(regController.handleNewUser,(req, res) => {
});

module.exports = router;