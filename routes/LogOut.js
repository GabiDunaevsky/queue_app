const express = require('express');
const router = express.Router();

router.get('^/$|/logout(.html)?', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

module.exports = router;