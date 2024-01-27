const APP_CONSTANTS = require("../constants.js");
const GROCERY_CONSTANTS = APP_CONSTANTS.GROCERY;

const {mandatoryFieldsCheck} = require("../utils/custom-utils.js");
const validateGrocery = async (req, res, next) => {

  let anyError = mandatoryFieldsCheck(req.body, GROCERY_CONSTANTS.REQUIRED_FIELDS)

  if (anyError) {
    return res
      .status(400)
      .json({ message: GROCERY_CONSTANTS.ERRORS.REQUIRED_PARAM_MISSING });
  }
  next();
};

module.exports = {
  validateGrocery
};
