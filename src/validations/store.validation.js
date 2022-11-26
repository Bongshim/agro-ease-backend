const Joi = require('joi');

const createStore = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().max(400),
    account_number: Joi.number(),
    bank: Joi.string(),
    account_name: Joi.string(),
    date_of_birth: Joi.date(),
    nin: Joi.number(),
  }),
};

const getStore = {
  params: Joi.object().keys({
    storeId: Joi.string().required(),
  }),
};

const updateStore = {
  params: Joi.object().keys({
    storeId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string().max(400),
  }),
};

const deleteStore = {
  params: Joi.object().keys({
    storeId: Joi.string().required(),
  }),
};

module.exports = {
  createStore,
  getStore,
  updateStore,
  deleteStore,
};