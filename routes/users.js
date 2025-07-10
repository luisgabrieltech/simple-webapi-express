const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");

const validate = require("../middlewares/validate");
const userSchema = require("../schemas/userSchema");
const authorizeRole = require("../middlewares/authorize");

router.get("/admin", authMiddleware, authorizeRole("admin"), (req, res) => {
    res.json({message: "This is an admin route"});
});

router.get("/profile", authMiddleware, usersController.getProfile);
router.get("/", authMiddleware, usersController.listUsers);
router.put("/:id", authMiddleware, validate(userSchema), usersController.updateUser);
router.delete("/:id", authMiddleware, usersController.deleteUser);

module.exports = router;    