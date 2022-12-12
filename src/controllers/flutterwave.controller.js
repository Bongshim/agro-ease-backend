/* eslint-disable camelcase */
const httpStatus = require('http-status');
const { flutterwaveService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const initializeTransaction = catchAsync(async (req, res) => {
  const { body } = req;
  const url = await flutterwaveService.initializePayment(body);
  console.log(url);
  res.status(httpStatus.OK).send(url);
});

const verifyPayment = catchAsync(async (req, res) => {
  const { status, tx_ref, transaction_id } = req.query;
  const data = await flutterwaveService.verifyPayment(status, tx_ref, transaction_id);
  res.status(httpStatus.OK).json(data);
});

module.exports = { verifyPayment, initializeTransaction };
