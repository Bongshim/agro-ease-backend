const express = require('express');
const { deliveryAddressController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), deliveryAddressController.createDeliveryAddress)
  .get(auth(), deliveryAddressController.getDeliveryAddresses);

router
  .route('/:addressId')
  .get(auth(), deliveryAddressController.getDeliveryAddress)
  .patch(auth(), deliveryAddressController.updateDeliveryAddress)
  .delete(auth(), deliveryAddressController.deleteDeliveryAddress);

module.exports = router;
