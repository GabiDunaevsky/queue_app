const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../middleware/IsAuthinticated');
const queueController = require('../controller/QueueDateController');

router.route('^/$|/queue(.html)?')
.get(auth.isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname,'..', 'view', 'queue.html'));
    // Retrieve the dateObj from the session
    const dateObj = req.session.queueDetails;
    if(dateObj && dateObj.treatment !== undefined){
        res.render('queue', { dateObj: dateObj });
    }
    else{
        res.redirect('/order');
    }
})
.post(queueController.storesDate);

module.exports = router;