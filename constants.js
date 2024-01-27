const APP_CONSTANTS = {
  ROLES: ['admin', 'customer'],
  USER: {
    REQUIRED_FIELDS: [
      "userName",
      "name",
      "password",
      "role",
    ],
    RES_DATE_FORMAT: 'YYYY-MM-DD HH24:MI:SS',
    ERRORS: Object.freeze({
      INVALID: 'Invalid user.',
      CREATE: 'Unable to create user.',
      GET: 'Unable to get user(s)',
      INVALID_ROLE: 'Invalid role',
      ALREADY_EXISTS: 'User with same user name already exists.'

    })
  },
  GROCERY: {
    REQUIRED_FIELDS: ["name", "price", "availableQuantity", "adminId"],
    ERRORS: Object.freeze({
      INVALID: 'Invalid grocery.',
      CREATE: 'Unable to create grocery.',
      GET: 'Unable to get grocery(s)',
      REQUIRED_PARAM_MISSING: 'Name is required',
      ALREADY_EXISTS: 'grocery with same name already exists.'
    })
  },
  ORDER: {
    ERRORS: Object.freeze({
      INVALID: 'Invalid Order.',
      CREATE: 'Unable to create order.',
      GET: 'Unable to get order(s)',
      ALREADY_EXISTS: 'An order already exists within 3 hours of the specified time.',
      INVALID_GROCERY: 'Grocery is either unavailble or out of stock',
      MISSING_ID: 'Order Id is missing',
      REQUIRED_PARAM_MISSING: "Total Fee or Service is required",
    })
  },
  ERRORS: Object.freeze({
    NOT_FOUND: 'Not found.',
    SOMETHING_WENT_WRONG: 'Something went wrong.',
    AUTHENTICATION_FAILED: 'Authentication Failed!'

  }),
  STATUS: Object.freeze({
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE'
  })
};

module.exports = Object.freeze(APP_CONSTANTS);
