const { User } = require('./User');
// eslint-disable-next-line camelcase
const { Billing_address } = require('./Billing_address');
// eslint-disable-next-line camelcase
const { Delivery_address } = require('./Delivery_address');
// eslint-disable-next-line camelcase
const { Business_address } = require('./Business_address');
const { Wallet } = require('./Wallet');
const { Store } = require('./Store');

exports.association = () => {
  // ONE TO One
  User.hasOne(Billing_address);
  Billing_address.belongsTo(User);

  User.hasOne(Delivery_address);
  Delivery_address.belongsTo(User);

  Wallet.hasOne(User);
  User.belongsTo(Wallet);

  User.hasOne(Store);
  Store.belongsTo(User);

  Wallet.hasOne(Store);
  Store.belongsTo(Wallet);

  Store.hasOne(Business_address);
  Business_address.belongsTo(Store);

  // MANY TO MANY
};
