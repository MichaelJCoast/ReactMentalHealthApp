const express = require('express');
const app = express();
const cors = require ('cors');

app.use(cors());
app.use(express.json());



const db = require ("./models/index");



const postRouter = require("./routes/posts");
const usersRouter = require("./routes/Users");
const messagesRouter = require("./routes/messages");


app.get("/", (req, res) => {
    res.json({ message: "Página de login" });
});

app.use("/posts", postRouter);
app.use("/auth", usersRouter);
app.use("/messages", messagesRouter);
app.use("/users", usersRouter);





db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
        });
});
