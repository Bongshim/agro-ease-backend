const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Order } = require('../models/Order');
const { createOrderRow } = require('./orderRow.service');

/**
 * calculate order total
 * @param {object} arr
 * @param {String} key
 * @returns {number} total
 */
const reduceAny = (arr, key) => {
  // eslint-disable-next-line no-return-assign, no-param-reassign
  const total = arr.reduce((acc, row) => (acc += row[key]), 0);
  return total;
};

/**
 * Get orders
 * @returns {Promise<order>}
 */
const getOrders = async () => {
  const orders = await Order.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  return orders;
};

/**
 * Get order
 * @param {ObjectId} id
 * @returns {Promise<order>}
 */
const getOrder = async (id) => {
  const order = await Order.findById(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return order;
};

/**
 * Create order
 * @param {object} requestBody
 * @returns {Promise<createdOrder>}
 */
const createOrder = async (userId, requestBody) => {
  const { order, orderRow } = requestBody;

  const total = reduceAny(orderRow, 'total_price');

  if (total !== order.total) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Total must be equal to the sum of all product price');
  }
  const orderBody = { ...order, UserId: userId, Status: 'pending' };

  const createdOrder = await Order.create(orderBody);

  const createdOrderRow = await createOrderRow(orderRow);

  createdOrder.setOrder_Rows(createdOrderRow);

  return createdOrder;
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
};
