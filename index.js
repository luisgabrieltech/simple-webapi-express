const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const port = 3000;

connectDB();
app.use(express.json());

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Simple API using Express and MongoDB");
});

app.listen(port, () => {
    console.log(`API running on port ${port}`);
});