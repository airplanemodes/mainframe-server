/********************
|   Database Part
*********************/
const psql = require('pg');
const { 
    selectEntries,
    createEntry,
    createUser 
} = require('./queries');

const bcrypt = require('bcrypt');
const { createToken } = require('../token');
const pool = new psql.Pool({
    user: "postgres",
    host: "localhost",
    database: "mainframe",
    port: 5432
});


const poolEntries = async(req, res) => {
    pool.query(selectEntries, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const writeEntry = async(req, res) => {
    const { title, content, author, node, created } = req.body;

    await pool.query(createEntry, [title, content, author, node, created], (error, results) => {
        if (error) throw error;

        console.log(results.rows);
        res.status(201).send("entry was written to the database");
    });
}

const userLogin = async(req, res) => {
    const { username, passwd } = req.body;

    await pool.query("SELECT * FROM users WHERE username = $1", [username], (error, results) => {
        if (error) throw error;

        // console.log(results.rows);

        if (results.rows.length > 0) {
            bcrypt.compare(passwd, results.rows[0].passwd, (error, isMatch) => {
                if (error) throw error;

                if (isMatch) {
                    console.log('success');
                    let token = createToken(results.rows[0].id)
                    // res.status(200).send(results.rows[0].username);
                    res.json({ created: token })
                } else {
                    console.log('something wrong');
                    res.status(400).send("password are incorrect")
                }
            });
        }
    })
};

const userCreate = async(req, res) => {
    const { username, email, passwd, entered } = req.body;

    let hashed = await bcrypt.hash(passwd, 10)
    
    await pool.query(createUser, [username, email, hashed, entered], (error, results) => {
        if (error) {
            switch (error.constraint) {
                case 'users_username_key':
                    res.status(400).send("username already taken");
                    break;
                case 'users_email_key':
                    res.status(400).send("email already taken");
                    break;
                default:
                    res.status(400).send("something wrong");
                    break;
            }
        } else {
            res.status(201).send("user created");
        }
    });
};

const userInfo = async(req, res) => {
    try {
        await pool.query("SELECT * FROM users WHERE id = $1", [req.tokenData.id], (error, results) => {
            if (error) throw error;
            res.json(results.rows[0].username);
        })
    } catch (error) {
        console.log(error);
    }  
}


module.exports = {
    poolEntries,
    writeEntry,
    userCreate,
    userLogin,
    userInfo
};