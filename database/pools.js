/********************
|   Database Part
*********************/
const psql = require('pg');
const { 
    selectPosts, 
    createUser 
} = require('./queries');

const bcrypt = require('bcrypt');
const pool = new psql.Pool({
    user: "postgres",
    host: "localhost",
    database: "mainframe",
    port: 5432
});


const poolPosts = async(req, res) => {
    pool.query(selectPosts, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

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
                    res.status(200).send(results.rows[0].username);
                } else {
                    console.log('something wrong');
                    res.status(400).send("password are incorrect")
                }
            });
        }
    })
};

const userCreate = async(req, res) => {
    const { username, email, passwd } = req.body;
    const dateObj = new Date();
    const entered = `${dateObj.getFullYear()}-${dateObj.getMonth()+1}-${dateObj.getDate()}`;

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
            // TODO: redirect
        }
    });
};


module.exports = {
    poolPosts,
    userCreate,
    userLogin
};