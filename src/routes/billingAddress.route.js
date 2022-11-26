const express = require('express');
const { billingAddressController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), billingAddressController.createBillingAddress)
  .get(auth(), billingAddressController.getBillingAddresses);

router
  .route('/:addressId')
  .get(auth(), billingAddressController.getBillingAddress)
  .patch(auth(), billingAddressController.updateBillingAddress)
  .delete(auth(), billingAddressController.deleteBillingAddress);

module.exports = router;
