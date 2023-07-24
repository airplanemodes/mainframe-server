const { Router } = require('express');
const router = Router();
const pool = require('../database/pool');
const middleJWT = require('../token');
const { 
    selectCredits, 
    insertCredit,
    deleteCredit } = require('../database/queries');

const poolCredits = async(req, res) => {
    await pool.query(selectCredits, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const addCredit = async(req, res) => {
    const { entryid, userid } = req.body; 
    await pool.query(insertCredit, [ entryid, userid ], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const removeCredit = async(req, res) => {
    const { entryid, userid } = req.body;
    await pool.query(deleteCredit, [ entryid, userid ], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

// http://localhost:4000/credits
router.get('/', poolCredits);
router.post('/', middleJWT.authToken, addCredit);
router.delete('/', middleJWT.authToken, removeCredit);

module.exports = router;