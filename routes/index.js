const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();

const userRoutes = require('./user.routes.js');
const groceryRoutes = require('./grocery.routes.js');
const orderRoutes = require('./order.routes.js');

router.get('/', (req, res) => {
  res.send('Hello World!' + process.env.NODE_ENV)
});

router.use('/users', userRoutes);
router.use('/groceries', groceryRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
