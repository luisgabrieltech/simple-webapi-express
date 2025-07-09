const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

const validate = require("../middlewares/validate");
const userSchema = require("../schemas/userSchema");

router.get("/", usersController.listUsers);
router.post("/", validate(userSchema), usersController.createUser);
router.put("/:id", validate(userSchema), usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;