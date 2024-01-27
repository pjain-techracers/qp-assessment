const { Op } = require('sequelize');

const Models = require("../models/index.js");
const Grocery = Models.Grocery;
const { sequelize } = Models;
const APP_CONSTANTS = require("../constants.js");
const GROCERY_CONSTANTS = APP_CONSTANTS.GROCERY;

// create a grocery
const create = async (req, res) => {
  try {
    const { name, price, availableQuantity } = req.body;
    await Grocery.create({ name, price, availableQuantity, adminId: req?.user?.id });
    res.sendStatus(201);
  } catch (e) {
    console.warn(e);
    res.status(500).send(APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG);
  }
};

// get a grocery by id
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const groceryInstance = await Grocery.findOne({ where: { id } });
    if (groceryInstance) {
      return res.status(200).send(groceryInstance);
    }
    return res.status(404).send(APP_CONSTANTS.ERRORS.NOT_FOUND);
  } catch (e) {
    console.warn(e);
    res.status(500).send(APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG);
  }
};

const getAll = async (req, res) => {
  return Grocery.findAll({
    attributes: [
      "name",  "price", "availableQuantity",
      [
        sequelize.fn(
          "to_char",
          sequelize.col("createdAt"),
          GROCERY_CONSTANTS.RES_DATE_FORMAT
        ),
        "created_at",
      ],
    ],
  })
    .then((groceries) => res.status(200).send({ groceries }))
    .catch((error) =>
      res.status(500).send(APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG)
    );
};

const getAvailableGrocery = (req, res) => {
  return Grocery.findAll({
    attributes: [
      "name",  "price", "availableQuantity",
      [
        sequelize.fn(
          "to_char",
          sequelize.col("createdAt"),
          GROCERY_CONSTANTS.RES_DATE_FORMAT
        ),
        "created_at",
      ],
    ],
    where: {
      availableQuantity: { [Op.gt]: 0 }
    }
  })
    .then((groceries) => res.status(200).send(groceries))
    .catch((error) =>
      res.status(500).send(APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG)
    );
};

const getByName = async (req, res) => {
  const { name } = req.query;
  try {
    const grocery = await Grocery.findOne({
      where: { name },
    });

    if (grocery) {
      return res.status(200).send(grocery);
    }
    return res.status(404).send(APP_CONSTANTS.ERRORS.NOT_FOUND);
  } catch (err) {
    return res.status(500).send(APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, availableQuantity } = req.body;
    await Grocery.update(
      { name, price, availableQuantity },
      {
        where: { id },
      }
    );
    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send(APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await Grocery.destroy({ where: { id } });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG);
  }
};

module.exports = {
  getByName,
  create,
  getById,
  getAll,
  update,
  deleteById,
  getAvailableGrocery
};
