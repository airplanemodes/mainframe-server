const bcrypt = require('bcrypt');
const { Router } = require('express');
const router = Router();
const pool = require('../database/pool');
const { selectEntry, selectUserByUsername } = require('../database/queries');
const middleJWT = require('../token');


const mainlogin = async(req, res) => {
    const { username, passwd } = req.body;
    await pool.query(selectUserByUsername, [username], 
        (error, results) => {
            if (error) throw error;
            if (results.rows.length == 0) res.status(400).send("username is not registered");
            if (results.rows.length > 0) {
                bcrypt.compare(passwd, results.rows[0].passwd, 
                    (error, isMatch) => {
                        if (error) throw error;
                        if (isMatch) {
                            const token = middleJWT.createToken(results.rows[0].id);
                            res.json({ created: token });
                        } else res.status(400).send("password are incorrect");
                });
            }
        });
}

const getEntryForEdit = async(req, res) => {
    const id = req.params.id;
    await pool.query(selectEntry, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows[0]);
    });
}

// http://localhost:4000/
router.get('/', (req, res) => { res.json({ msg: "Hi, this is Mainframe" })});
router.post('/login', mainlogin);
router.get('/edit/:id', middleJWT.authToken, getEntryForEdit);

module.exports = router;