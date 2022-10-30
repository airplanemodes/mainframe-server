const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.json({ msg: "Hi, this is Mainframe and I got your HTTP request" });
});

module.exports = router;