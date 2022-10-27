/********************
|   Essentials
*********************/
const express = require('express');
const app = express();

app.use(express.json());

const allowAccessControl = (app) => { 
    app.all('*', function (req, res, next) {
        if (!req.get('Origin')) return next();
        res.set('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, x-auth-token');
        next();
    });
};

allowAccessControl(app);



/********************
|   Database Part
*********************/
const psql = require('pg');
const pool = new psql.Pool({
    user: "postgres",
    host: "localhost",
    database: "mainframe",
    port: 5432
});



/********************
|   Back to server
*********************/
app.get('/', (req, res) => {
    res.send("Hi, this is Mainframe and I got your HTTP request");
});

app.listen(4000, () => {
    console.log("Server working on port 4000");
});