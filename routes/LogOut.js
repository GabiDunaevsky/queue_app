const express = require('express');
const router = express.Router();

router.get('^/$|/logout(.html)?', (req, res) => {
    req.logout((err) => {
      if (err) {
        // Handle error, if any
        console.error('Error logging out:', err);
        return res.redirect('/'); // Redirect to home page or login page
      }
      // Successful logout
      res.redirect('/');
    });
  });

module.exports = router;