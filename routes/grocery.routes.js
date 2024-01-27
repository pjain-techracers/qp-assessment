const express = require("express");
const router = express.Router();

const {
  getAll,
  getByName,
  create,
  getById,
  update,
  deleteById,
  getAvailableGrocery,
} = require("../controllers/groceries.controller.js");

const {
  validateGrocery,
} = require("../middlewares/grocery.js");
const { checkPermission } = require("../middlewares/rbac");
const { authenticateToken } = require("../middlewares/auth");

router.get("/", authenticateToken, checkPermission("get_all_grocery"), getAll);
router.get(
  "/get_available_items", authenticateToken, 
  checkPermission("get_avilable_grocery"),
  getAvailableGrocery
);

router.post("/", authenticateToken, checkPermission("create_grocery"), validateGrocery, create);

router.get("/get_name", authenticateToken, checkPermission("get_grocery_byname"), getByName);

router.get("/:id", authenticateToken, checkPermission("get_grocery_byid"), getById);

router.patch("/:id", authenticateToken, checkPermission("update_grocery"), update);

router.delete("/:id", authenticateToken, checkPermission("delete_grocery"), deleteById);

module.exports = router;
