const express = require("express");
const router = express.Router();

let users = [
    {id: 1, name: "Luis Gabriel"},
    {id: 2, name: "Carlos Alberto"},
    {id: 3, name: "Matheus Fernandes"}
];

router.get("/", (req, res) => {
    res.json(users);
});

router.post("/", (req, res) => {
    const { name } = req.body;

    // Validation to check if the name is required
    if (!name) {
        return res.status(400).json({ error: "Name is required"});
    }

    const newUser = {
        id: Date.now(),
        name
    };

    // we don't need to use a database for now, we can use an array to store the users on the server
    users.push(newUser);
    res.status(201).json(newUser);

});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({error: "Name is required"});
    }

    const index = users.findIndex(user => user.id === Number(id));

    if (index === -1) {
        return res.status(404).json({error: "User not found"});
    }

    users[index].name = name;

    res.json(users[index]);
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const index = users.findIndex(user => user.id === Number(id));

    if (index === -1) {
        return res.status(404).json({error: "User not found"});
    }

    const deletedUser = users.splice(index, 1)[0];

    res.json({message: "User deleted successfully", user: deletedUser})
})

module.exports = router;