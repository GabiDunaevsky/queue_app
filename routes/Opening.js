const express = require('express');
const router = express.Router();

router.get('^/$|/opening(.html)?', (req, res) => {
    res.send("Hello opening");
});

module.exports = router;