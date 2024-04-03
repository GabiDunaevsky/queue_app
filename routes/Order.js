const auth = require('../middleware/IsAuthinticated');
const express = require('express');
const router = express.Router();
const path = require('path');
const orderController = require('../controller/OrderPageController');

router.route('^/$|/order(.html)?')
.get(auth.isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'view', 'order.html'));
})
.post(orderController.storestreatment);

module.exports = router;