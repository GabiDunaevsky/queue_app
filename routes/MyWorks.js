const express = require('express');
const router = express.Router();

router.get('^/$|/myWorks(.html)?', (req, res) => {
    res.send("Hello myWorks");
});

module.exports = router;