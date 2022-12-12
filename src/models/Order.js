const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

exports.Order = sequelize.define('Order', {
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
