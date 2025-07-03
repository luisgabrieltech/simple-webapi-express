const User = require("../models/User");

let users = [
    {id: 1, name: "Luis Gabriel"},
    {id: 2, name: "Carlos Alberto"},
    {id: 3, name: "Matheus Fernandes"}
];

async function listUsers(req, res) {
    const users = await User.find();
    res.json(users);
}

async function createUser(req, res) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({error: "Name is required"})
    };

    const user = await User.create({ name })

    res.status(201).json(user);
};

async function updateUser(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({error: "Name is required"});
    };

    const user = await User.findByIdAndUpdate(id, {name}, {new: true});

    if (!user) {
        return res.status(404).json({error: "User not found"});
    };

    res.json(user);
}

async function deleteUser(req, res) {
    const { id } = req.params;
    
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return res.status(404).json({error: "User not found"});
    }

    res.json({message: "User deleted successfully", user});
};

module.exports = {
    listUsers,
    createUser,
    updateUser,
    deleteUser
}