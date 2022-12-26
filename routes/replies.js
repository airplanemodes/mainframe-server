const { Router } = require('express');
const router = Router();
const pool = require('../database/pool');
const middleJWT = require('../token');
const { selectReplies, insertReply } = require('../database/queries');



const poolReplies = async(req, res) => {
  await pool.query(selectReplies, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
}

const writeReply = async(req, res) => {
  const { body, username, authorid, entryid } = req.body;
  
  await pool.query(insertReply, [ body, username, authorid, entryid ],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
}

// http://localhost:4000/replies
router.get('/', poolReplies);
router.post('/', middleJWT.authToken, writeReply);

module.exports = router;