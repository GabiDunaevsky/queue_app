const express = require('express');
const router = express.Router();

router.get('^/$|/order(.html)?', (req, res) => {
    res.send("Hello order");
});

module.exports = router;