const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Contract = require('./Contract');

const Job = sequelize.define('Job', {
    id: { type: DataTypes.INTEGER,
         primaryKey: true,
          autoIncrement: true },
    contractId: { type: DataTypes.INTEGER,
         allowNull: false },
    description: { type: DataTypes.STRING(45),
         allowNull: false },
    operationDate: { type: DataTypes.DATE,
         allowNull: false },
    paymentDate: { type: DataTypes.DATE },
    price: { type: DataTypes.DOUBLE,
         allowNull: false },
    paid: { type: DataTypes.BOOLEAN,
         defaultValue: false },
});

Job.belongsTo(Contract,
     { foreignKey: 'contractId' });

module.exports = Job;
