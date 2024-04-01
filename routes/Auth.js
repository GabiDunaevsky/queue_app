const express = require('express');
const router = express.Router();

router.get('^/$|/auth(.html)?', (req, res) => {
    res.send("Hello auth");
});

module.exports = router;