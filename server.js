const express = require('express');
const { allowAccessControl, routes } = require('./routes/config');
const mainframe = express();

mainframe.use(express.json());

allowAccessControl(mainframe);
routes(mainframe);

const port = process.env.PORT || 4000;
mainframe.listen(port, () => {
    console.log(`*** Server running on port ${port}`);
});