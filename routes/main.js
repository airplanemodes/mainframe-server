const psql = require('pg');
const bcrypt = require('bcrypt');
const { Router } = require('express');
const router = Router();

const middleJWT = require('../token');

const pool = new psql.Pool({
    user: "postgres",
    host: "localhost",
    database: "mainframe",
    port: 5432
});


const mainlogin = async(req, res) => {
    const { username, passwd } = req.body;
    await pool.query("SELECT * FROM users WHERE username = $1", [username], (error, results) => {
        if (error) throw error;
        if (results.rows.length > 0) {
            bcrypt.compare(passwd, results.rows[0].passwd, (error, isMatch) => {
                if (error) throw error;
                if (isMatch) {
                    const token = middleJWT.createToken(results.rows[0].id)
                    res.json({ created: token })
                } else {
                    console.log('something wrong');
                    res.status(400).send("password are incorrect")
                }
            });
        }
    })
};

// http://localhost:4000/
router.get('/', (req, res) => { res.json({ msg: "Hi, this is Mainframe" })});
router.post('/login', mainlogin);

module.exports = router;