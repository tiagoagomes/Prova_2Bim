const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Profile = require('./Profile');

const Contract = sequelize.define('Contract', {
    id: { type: DataTypes.INTEGER,
         primaryKey: true,
          autoIncrement: true },
    terms: { type: DataTypes.STRING(40),
         allowNull: false },
    clientId: { type: DataTypes.INTEGER,
         allowNull: false },
    contractorId: { type: DataTypes.INTEGER,
         allowNull: false },
    operationDate: { type: DataTypes.DATE,
         allowNull: false },
    status: { type: DataTypes.STRING(10),
         allowNull: false },
});

Contract.belongsTo(Profile, { foreignKey: 'clientId',
     as: 'client' });
Contract.belongsTo(Profile, { foreignKey: 'contractorId',
     as: 'contractor' });

module.exports = Contract;
