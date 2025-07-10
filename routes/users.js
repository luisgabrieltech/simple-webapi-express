const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");

const validate = require("../middlewares/validate");
const userSchema = require("../schemas/userSchema");

router.get("/profile", authMiddleware, usersController.getProfile);

router.get("/", authMiddleware, usersController.listUsers);
router.post("/", authMiddleware, validate(userSchema), usersController.createUser);
router.put("/:id", authMiddleware, validate(userSchema), usersController.updateUser);
router.delete("/:id", authMiddleware, usersController.deleteUser);

module.exports = router;