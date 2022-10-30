/********************
|   Essentials
*********************/
const express = require('express');
const { allowAccessControl, routes } = require('./routes/config');
const app = express();

app.use(express.json());

allowAccessControl(app);
routes(app);



/********************
|   Back to server
*********************/
app.listen(4000, () => {
    console.log("Server working on port 4000");
});