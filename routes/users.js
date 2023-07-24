const bcrypt = require('bcrypt');
const { Router } = require('express');
const router = Router();
const pool = require('../database/pool');
const middleJWT = require('../token');
const { 
    selectAllUsers,
    selectUserById,
    selectUserByUsername,
    insertUser 
} = require('../database/queries');



const allUsersIdsUsernames = async(req, res) => {
    try {
        await pool.query(selectAllUsers, (error, results) => {
            if (error) throw error;
            for (let i = 0; i < results.rows.length; i++) {
                delete results.rows[i].email;
                delete results.rows[i].passwd;
                delete results.rows[i].points;
                delete results.rows[i].entered;
                delete results.rows[i].moderator;
            }
            res.json(results.rows);
        });
    } catch (error) {
        console.log(error);
    }
}

const userCreate = async(req, res) => {
    const { username, email, passwd, points, entered, moderator } = req.body;
    let hashed = await bcrypt.hash(passwd, 10);
  
    await pool.query(insertUser, 
        [username, email, hashed, points, entered, moderator], 
        (error, results) => {
            if (error) {
                switch (error.constraint) {
                    case 'users_username_key':
                        res.status(400).send("username already taken");
                        break;
                    case 'users_email_key':
                        res.status(400).send("email already taken");
                        break;
                default:
                    res.status(400).send(error.message);
                }
            } else {
                res.status(201).send("user created");
            }
        });
}



const userInfoById = async(req, res) => {
    try {
        await pool.query(selectUserById, [req.tokenData.id], (error, results) => {
            if (error) throw error;
            delete results.rows[0].passwd;
            res.json(results.rows[0]);
        });
    } catch (error) {
        console.log(error);
    }
}

const userInfoByUsername = async(req, res) => {
    try {
        const username = req.params.username;
        await pool.query(selectUserByUsername, [username], (error, results) => {
            if (error) throw error;
            delete results.rows[0].passwd;
            res.json(results.rows[0]);
        });
    } catch (error) {
        console.log(error);
    }
}



// http://localhost:4000/users
router.get('/all', middleJWT.authToken, allUsersIdsUsernames);
router.get('/', middleJWT.authToken, userInfoById);
router.get('/:username', middleJWT.authToken, userInfoByUsername);
router.post('/', userCreate);

module.exports = router;