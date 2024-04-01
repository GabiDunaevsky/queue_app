const express = require('express');
const router = express.Router();

router.get('^/$|/queue(.html)?', (req, res) => {
    res.send("Hello queue");
});

module.exports = router;