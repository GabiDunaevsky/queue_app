const express = require('express');
const router = express.Router();
const regController = require('../controller/RegisterController')

router.route('^/$|/register(.html)?')
.get((req, res) => {
    res.render('register');
})
.post(regController.handleNewUser);

module.exports = router;