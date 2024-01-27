"use strict";
const { Model, Deferrable } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // OrderItem.belongs(models.Grocery, { onDelete: "RESTRICT" });
      models.Order.belongsToMany(models.Grocery, { through: "OrderItem" });
      models.Grocery.belongsToMany(models.Order, { through: "OrderItem" });
    }
  }

  OrderItem.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 1
      }
    },
    {
      sequelize,
      modelName: "OrderItem",
      paranoid: true,
      timestamps: false,
    }
  );
  return OrderItem;
};
