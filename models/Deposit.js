const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Profile = require('./Profile');

const Deposit = sequelize.define('Deposit', {
    id: { type: DataTypes.INTEGER,
         primaryKey: true, autoIncrement: true },
    clientId: { type: DataTypes.INTEGER,
         allowNull: false },
    operationDate: { type: DataTypes.DATE,
         allowNull: false },
    depositValue: { type: DataTypes.DOUBLE,
         allowNull: false },
});

Deposit.belongsTo(Profile, { foreignKey: 'clientId' });

module.exports = Deposit;
