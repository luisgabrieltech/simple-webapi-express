const express = require("express");
const router = express.Router();
const { listUsers, createUser, updateUser, deleteUser } = require("../controllers/usersController");

router.get("/", listUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;