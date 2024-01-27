const express = require("express");
const router = express.Router();

const {
  signup,
  login,
} = require("../controllers/users.controller");

const { validateUser } = require("../middlewares/user");

router.post("/login", login);

router.post("/signup", validateUser, signup);

module.exports = router;
