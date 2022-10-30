const pool = require('./psql');
const { selectPosts, createUser } = require('./queries');

const poolPosts = async(req, res) => {
    pool.query(selectPosts, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const newUser = async(req, res) => {
    const { username, email, passwd } = req.body;
    const dateObj = new Date();
    const entered = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;

    await pool.query(createUser, [username, email, passwd, entered], (error, results) => {
        if (error) throw error;
        res.status(201).send("user created");
    });
};


module.exports = {
    poolPosts,
    newUser
};