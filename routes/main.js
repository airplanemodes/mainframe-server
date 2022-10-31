const express = require('express');
const { userLogin } = require('../database/pools');
const router = express.Router();

router.get('/', async(req, res) => {
    res.json({ msg: "Hi, this is Mainframe and I got your HTTP request" });
});

router.post('/login', userLogin);

module.exports = router;