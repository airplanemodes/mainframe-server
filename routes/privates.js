const { Router } = require('express');
const router = Router();
const pool = require('../database/pool');
const middleJWT = require('../token');
const { selectPrivates } = require('../database/queries');

const poolPrivates = async(req, res) => {
  await pool.query(selectPrivates, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
}

// http://localhost:4000/privates
router.get('/', middleJWT.authToken, poolPrivates);

module.exports = router;