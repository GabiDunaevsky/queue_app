const express = require('express');
const router = express.Router();

router.get('^/$|/confirm(.html)?', (req, res) => {
    res.send("Hello confirm");
});

module.exports = router;