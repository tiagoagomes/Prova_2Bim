const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const Profile = sequelize.define("Profile", {
  id: { type: DataTypes.INTEGER, primaryKey: true,
     autoIncrement: true },
  firstname: { type: DataTypes.STRING(40),
     allowNull: false },
  lastname: { type: DataTypes.STRING(40),
     allowNull: false },
  profession: { type: DataTypes.STRING(40),
     allowNull: true },
  balance: { type: DataTypes.DOUBLE, 
    allowNull: false, defaultValue: 0 },
  type: { type: DataTypes.STRING(40),
     allowNull: false },
}); 

module.exports = Profile;
