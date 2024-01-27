//importing modules
const express = require("express");
const _ = require("lodash");


const Models = require("../models/index.js");
const User = Models.User;
//Assigning db.users to User variable
const APP_CONSTANTS = require("../constants.js");
const { mandatoryFieldsCheck } = require("../utils/custom-utils.js");
const USER_CONSTANTS = APP_CONSTANTS.USER;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const validateUser = async (req, res, next) => {
  //search the database to see if user exist
  try {
    // check mandatory fields
    let validateMandatoryFields = mandatoryFieldsCheck(
      req.body,
      USER_CONSTANTS.REQUIRED_FIELDS
    );
    if (validateMandatoryFields) {
      return res.status(409).send(validateMandatoryFields);
    }

    // check allowed roles
    if (!(_.includes(APP_CONSTANTS.ROLES, req.body.role))) {
      return res.status(409).send(USER_CONSTANTS.ERRORS.INVALID_ROLE);
    }

    const username = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    //if username exist in the database respond with a status of 409
    if (username) {
      return res.status(409).send(USER_CONSTANTS.ERRORS.ALREADY_EXISTS);
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

//exporting module
module.exports = {
  validateUser,
};
