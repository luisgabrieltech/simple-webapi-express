let users = [
    {id: 1, name: "Luis Gabriel"},
    {id: 2, name: "Carlos Alberto"},
    {id: 3, name: "Matheus Fernandes"}
];

function listUsers(req, res) {
    res.json(users);
}

function createUser(req, res) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({error: "Name is required"})
    };

    const newUser = {
        id: Date.now(),
        name
    };

    users.push(newUser);
    res.status(201).json(newUser);
};

function updateUser(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({error: "Name is required"});
    };

    const index = users.findIndex(user => user.id === Number(id));

    if (index === -1) {
        return res.status(404).json({error: "User not found"});
    };

    users[index].name = name;

    res.json(users[index]);
}

function deleteUser(req, res) {
    const { id } = req.params;
    
    const index = users.findIndex(user => user.id === Number(id));
    if (index === -1) {
        return res.status(404).json({error: "User not found"});
    }

    const deletedUser = users.splice(index, 1)[0];
    res.json({message: "User deleted successfully", user: deletedUser});
};

module.exports = {
    listUsers,
    createUser,
    updateUser,
    deleteUser
}