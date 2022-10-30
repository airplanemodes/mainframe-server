const express = require('express');
const { newUser } = require('../database/pools');
const router = express.Router();

router.get('/', async(req, res) => {
    res.json({ msg: "users api" });
});

router.post('/', newUser);

module.exports = router;