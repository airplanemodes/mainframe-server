const express = require('express');
const { userCreate, userLogin, userInfo } = require('../database/pools');
const token = require('../token');
const router = express.Router();

// http://localhost:4000/users
router.get('/', token.authToken, userInfo);
router.post('/', userCreate);
router.post('/login', userLogin);

module.exports = router;