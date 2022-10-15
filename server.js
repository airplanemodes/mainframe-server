const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send("Hi, this is Mainframe server and I got your HTTP request");
});

app.listen(4000, () => {
    console.log("Server working on port 4000");
});