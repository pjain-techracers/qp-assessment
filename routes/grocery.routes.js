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

router.get("/", checkPermission("get_all_grocery"), getAll);
router.get(
  "/get_available_items",
  checkPermission("get_avilable_grocery"),
  getAvailableGrocery
);

router.post("/", checkPermission("create_grocery"), validateGrocery, create);

router.get("/get_name", checkPermission("get_grocery_byname"), getByName);

router.get("/:id", checkPermission("get_grocery_byid"), getById);

router.patch("/:id/:name", checkPermission("update_grocery"), update);

router.delete("/:id", checkPermission("delete_grocery"), deleteById);

module.exports = router;
