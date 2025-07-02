const express = require("express");
const app = express();
const port = 3000;

let users = [
    {id: 1, name: "Luis Gabriel"},
    {id: 2, name: "Carlos Alberto"},
    {id: 3, name: "Matheus Fernandes"}
];

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Simple API using Express");
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", (req, res) => {
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

app.put("/users/:id", (req, res) => {
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

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    const index = users.findIndex(user => user.id === Number(id));

    if (index === -1) {
        return res.status(404).json({error: "User not found"});
    }

    const deletedUser = users.splice(index, 1)[0];

    res.json({message: "User deleted successfully", user: deletedUser})
})

app.listen(port, () => {
    console.log(`API running on port ${port}`);
});