const express = require('express');
const { userCreate } = require('../database/pools');
const router = express.Router();

router.get('/', async(req, res) => {
    try {
        res.json({msg: "users api"});
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
});

router.post('/', userCreate);

module.exports = router;