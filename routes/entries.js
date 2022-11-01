const { Router } = require('express');
const { poolEntries, writeEntry } = require('../database/pools');
const router = Router();

// http://localhost:4000/entries
router.get('/', poolEntries);
router.post('/', writeEntry);

module.exports = router;