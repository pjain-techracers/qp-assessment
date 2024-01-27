const fs = require('fs')
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const jwtSecretKey = 'paridhijainquestionprosecretkeyforjwt'

const mandatoryFieldsCheck = (instanceToCheck, keys) => {
  let errorMessage = "";
  _.each(keys, (key) => {
    if (!instanceToCheck[key]) {
      errorMessage = errorMessage + key + " is missing,";
    }
  });
  return errorMessage;
};

function getJWTToken(user) {
 return jwt.sign({ id: user.id, role: user.role }, process.env.secretKey || jwtSecretKey, {
    expiresIn: 1 * 24 * 60 * 60 * 1000,
  });
}

function verifyAccessToken(token) {
  const secret = jwtSecretKey;

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = {
  mandatoryFieldsCheck,
  getJWTToken,
  verifyAccessToken,
}
