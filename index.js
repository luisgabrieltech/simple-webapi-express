const express = require("express");
const app = express();
const connectDB = require("./config/db");
const port = 3000;

connectDB();
app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.get("/", (req, res) => {
    res.send("Simple API using Express and MongoDB");
});

app.listen(port, () => {
    console.log(`API running on port ${port}`);
});