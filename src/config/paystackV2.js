/* eslint-disable import/no-useless-path-segments */
/* eslint-disable camelcase */
const axios = require('axios');
const httpStatus = require('http-status');
const banks = require('../utils/banks');
const { secret } = require('../config/config').paystack;
const ApiError = require('../utils/ApiError');

const apiCall = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: { authorization: `Bearer ${secret}` },
});

/**
 * Get recipient code from paystack
 * @param {object} wallet
 * @returns {Promise<recipient_code>}
 */
const getRecpientCode = async (wallet) => {
  const { name, code, currency, type } = banks[wallet.bank];
  const { account_number } = wallet;
  const payload = { type, name, account_number, bank_code: code, currency };

  const res = await apiCall.post('/transferrecipient', payload);
  const {
    data: { recipient_code },
  } = res.data;

  return recipient_code;
};

/**
 * transfer to recipient
 * @param {number} amount
 * @param {number} recipient
 * @returns {Promise<report>}
 */
const transferRecipient = async (amt, recipient) => {
  const amount = amt * 100;
  const payload = {
    source: 'balance',
    raeson: 'AgroEase settlement',
    amount,
    recipient,
  };
  try {
    const res = await apiCall.post('/transfer', payload);
    const {
      status,
      data: { amount: value, reason, transfer_code, createdAt, id },
    } = res.data;

    const report = {
      id,
      status,
      value,
      reason,
      transfer_code,
      createdAt,
    };

    return report;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, err.message);
  }
};

module.exports = { getRecpientCode, transferRecipient };
