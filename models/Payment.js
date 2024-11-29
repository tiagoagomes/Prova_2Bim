const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  operationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  paymentValue: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

module.exports = Payment;
