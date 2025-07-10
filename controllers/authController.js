const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function login(req, res) {    
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({error: "User not found"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({error: "Invalid password or email"})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

    res.json({token});
}

async function register(req, res) {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({error: "User already exists"});
    }

    const user = new User({name, email, password});
    await user.save();

    const {password: _, ...userWithoutPassword} = user.toObject();

    res.status(201).json(userWithoutPassword);
}

module.exports = {
    register,
    login   
};