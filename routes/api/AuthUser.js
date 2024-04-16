const express = require('express');
const router = express.Router();
const auth = require('../../middleware/IsAuthinticated');

router.route('/isAuth')
.get(auth.isAuthenticated,(req, res) => {
});
router.route('/firstName')
.get((req, res) => {
    if(req.user){
        return res.send(req.user.firstName);
    }
});

module.exports = router;