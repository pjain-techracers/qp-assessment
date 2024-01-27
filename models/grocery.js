"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Grocery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Grocery.belongsTo(models.User, {foreignKey: 'adminId'});
      // Grocery.belongsToMany(models.Order, { through: "OrderItem" });
    }
  }
  Grocery.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      availableQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // timestamps will be automatically added - createdAt, updatedAt
    },
    {
      sequelize,
      modelName: "Grocery",
    }
  );

  return Grocery;
};
