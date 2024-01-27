const moment = require("moment");
const _ = require("lodash");
const { Op } = require("sequelize");

const Models = require("../models/index.js");
const { Order, Grocery, OrderItem } = Models;
const APP_CONSTANTS = require("../constants.js");

const ORDER_ERRORS = APP_CONSTANTS.ORDER.ERRORS;

const create = async (req, res) => {
  // Validations
  const { billAmount, groceries } = req.body;

  // check all groceries present
  // also check if quantity is correct and product is available
  const groceryIds = [];
  _.forEach(groceries, (g) => {
    groceryIds.push(g.groceryId);
  });
  const groceriesInDb = await Grocery.findAll({
    where: {
      id: {
        [Op.in]: groceryIds,
      },
    },
  });
  if (groceriesInDb.length !== groceryIds.length) {
    return res.status(400).send({
      status: APP_CONSTANTS.STATUS.FAILURE,
      message: ORDER_ERRORS.INVALID_GROCERY,
    });
  }
  return Order.create({
    billAmount,
    UserId: req?.user?.id,
  })
    .then((order) => {
      const orderId = order.id;
      let orderItemsInstance = [];
      _.each(groceries, (g) => {
        orderItemsInstance.push({
          OrderId: orderId,
          GroceryId: g.groceryId,
          quantity: g.quantity,
        });
      });

      return OrderItem.bulkCreate(orderItemsInstance);
      // add logic decrease quantity of Grocery
    })
    .then(() => {
      return res.status(201).send({
        status: APP_CONSTANTS.STATUS.SUCCESS,
      });
    })
    .catch((error) =>
      res.status(500).send({
        status: APP_CONSTANTS.STATUS.FAILURE,
        message: APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG,
      })
    );
};

const getAll = async (req, res) => {
  try {
    let whereCondition = {};
    if (req?.user?.role == "customer") {
      whereCondition = { UserId: req?.user?.id };
    }
    const orders = await Order.findAll({
      where: whereCondition,
      // include: { model: 'User', attributes: ['name']},
    });
    res.status(200).json({
      status: APP_CONSTANTS.STATUS.SUCCESS,
      orders,
    });
  } catch (err) {
    res.status(500).send({
      status: APP_CONSTANTS.STATUS.FAILURE,
      message: ORDER_ERRORS.GET,
    });
  }
};

// get a order by id
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    let whereCondition = { id };
    if (req.role == "customer") {
      whereCondition.UserId = req?.user?.id;
    }
    const orderDetails = await Order.findOne({
      where: whereCondition,
    });
    if (orderDetails) {
      return res.status(200).send(orderDetails);
    }
    return res.status(404).send(APP_CONSTANTS.ERRORS.NOT_FOUND);
  } catch (e) {
    console.warn(e);
    res.status(500).send(APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG);
  }
};

const deleteById = async (req, res) => {
  try {

    const orderDetails = await Order.findByPk(req.params.id);
    if (!orderDetails) {
      return res.status(404).json({
        message: APP_CONSTANTS.ERRORS.NOT_FOUND,
        status: APP_CONSTANTS.STATUS.FAILURE,
      });
    } else {
      await orderDetails.destroy();
      return res.status(200).json({
        status: APP_CONSTANTS.STATUS.SUCCESS,
      });
    }
  } catch (error) {
    console.error("Error inserting task:", error);
    return res.status(500).json({
      status: APP_CONSTANTS.STATUS.FAILURE,
      message: APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG,
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
};
