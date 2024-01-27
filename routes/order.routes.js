const express = require("express");
const router = express.Router();

const {
  getAll,
  create,
  getById,
  deleteById,
} = require("../controllers/orders.controller.js");

const { validateOrder } = require("../middlewares/order.js");
const { checkPermission } = require("../middlewares/rbac");
const { authenticateToken } = require("../middlewares/auth");

router.get("/", authenticateToken, checkPermission("get_all_orders"), getAll);

router.post("/", authenticateToken, checkPermission("create_order"), validateOrder, create);

router.get("/:id", authenticateToken, checkPermission("get_order_byid"), getById);

router.delete("/:id", authenticateToken, checkPermission("delete_order"), deleteById);

module.exports = router;
