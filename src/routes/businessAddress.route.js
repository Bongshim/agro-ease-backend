const express = require('express');
const { businessAddressController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(auth(), businessAddressController.getBusinessAddresses);
router.route('/store/:storeId').post(auth(), businessAddressController.createBusinessAddress);

router
  .route('/:addressId')
  .get(auth(), businessAddressController.getBusinessAddress)
  .patch(auth(), businessAddressController.updateBusinessAddress)
  .delete(auth(), businessAddressController.deleteBusinessAddress);

module.exports = router;
