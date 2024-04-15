const auth = require('../middleware/IsAuthinticated');
const express = require('express');
const router = express.Router();
const path = require('path');
const orderController = require('../controller/OrderPageController');

router.route('^/$|/order(.html)?')
//auth.isAuthenticated
.get(auth.isAuthenticated,(req, res) => {
    console.log(req.session);
    console.log(req.headers.origin);
    // res.sendFile(path.join(__dirname,'..', 'view', 'order.html'));
    // res.json({ message: 'Access granted to protected page', user: req.user });
})
// .post(orderController.storestreatment);

module.exports = router;