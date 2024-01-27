const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Models = require("../models");
const User = Models.User;
const APP_CONSTANTS = require("../constants.js");

const { getJWTToken } = require("../utils/custom-utils.js");

const USER_CONSTANTS = APP_CONSTANTS.USER;

const signup = async (req, res) => {
  try {
    const { userName, password, name, role } = req.body;
    const data = {
      userName,
      name,
      role,
      password: await bcrypt.hash(password, 10),
    };
    const user = await User.create(data);

    if (user) {
      return res.status(201).send(user);
    } else {
      return res.status(409).send(USER_CONSTANTS.ERRORS.CREATE);
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    //find a user by their email
    const user = await User.findOne({
      where: {
        userName,
      },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        let token = getJWTToken(user)

        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        return res.status(201).send({user, token});
      } else {
        return res.status(401).send(APP_CONSTANTS.ERRORS.AUTHENTICATION_FAILED);
      }
    } else {
      return res.status(401).send(APP_CONSTANTS.ERRORS.AUTHENTICATION_FAILED);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
};
