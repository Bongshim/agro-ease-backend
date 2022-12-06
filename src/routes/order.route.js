const express = require('express');
const { orderController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(auth(), orderController.createOrder).get(auth(), orderController.getOrders);

router.route('/:orderId').get(auth(), orderController.getOrder);

module.exports = router;
