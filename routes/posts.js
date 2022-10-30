const { Router } = require('express');
const { poolPosts } = require('../database/pools');
const router = Router();

// Get all posts from the database for a guest viewer
router.get('/', poolPosts);

module.exports = router;