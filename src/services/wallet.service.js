const httpStatus = require('http-status');
const { Wallet } = require('../models/Wallet');
const { userService } = require('./index');
const ApiError = require('../utils/ApiError');

/**
 * Create a new delivery address
 * @param {object} walletBody
 * @return {promise<wallet>}
 */
const createWallet = async (userId, walletBody) => {
  const walletId = await userService.getWalletId(userId);

  if (walletId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Wallet exists');
  }

  const user = await userService.getUserById(userId);

  const wallet = await Wallet.create(walletBody);

  wallet.setUser(user);

  return wallet;
};

/**
 * Get wallets
 * @return {promise<wallets>}
 */
const getWallets = async () => {
  const wallets = await Wallet.findAll();
  return wallets;
};

/**
 * Get wallet
 * @param {string} walletId
 * @return {promise<wallet>}
 */
const getWallet = async (walletId) => {
  const wallet = await Wallet.findByPk(walletId);
  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found');
  }

  return wallet;
};

/**
 * Update wallet
 * @param {object} walletBody
 * @return {promise<wallet>}
 */
const updateWallet = async (userId, walletId, walletBody) => {
  const wallet = await Wallet.findByPk(walletId);
  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found');
  }

  const { type, WalletId } = await userService.getUserById(userId);

  if (WalletId === parseInt(walletId, 10) || type === 'admin') {
    Object.assign(wallet, walletBody);
    // eslint-disable-next-line no-return-await
    return await Wallet.update(wallet.dataValues, { where: { id: walletId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot edit');
};

/**
 * Delete wallet
 * @param {*}  userId walletId
 * @return {promise<wallet>}
 */
const deleteWallet = async (userId, walletId) => {
  const wallet = await Wallet.findByPk(walletId);
  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found');
  }

  const { type, WalletId } = await userService.getUserById(userId);

  if (walletId === WalletId || type === 'admin') {
    // eslint-disable-next-line no-return-await
    return await Wallet.destroy({ where: { id: walletId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot delete');
};

module.exports = {
  createWallet,
  getWallets,
  getWallet,
  updateWallet,
  deleteWallet,
};
