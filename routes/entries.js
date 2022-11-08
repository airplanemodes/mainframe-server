const { Router } = require('express');
const router = Router();
const pool = require('../database/pool');
const middleJWT = require('../token');
const { selectEntries, 
        selectEntriesByNode,
        selectEntry, 
        insertEntry,
        updateEntry,
        deleteEntryById } = require('../database/queries');





const poolEntries = async(req, res) => {
    await pool.query(selectEntries, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const poolNodeEntries = async(req, res) => {
    const node = req.params.name;
    await pool.query(selectEntriesByNode, [node],
        (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const readEntry = async(req, res) => {
    const id = req.params.id;
    await pool.query(selectEntry, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows[0]);
    });
};

const editEntry = async(req, res) => {
    const { title, content, author, node, points, created, id } = req.body;
    await pool.query(updateEntry,
        [ title, content, author, node, points, created, id ],
        (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        });
};

const deleteEntry = async(req, res) => {
    const id = req.params.id;
    await pool.query(deleteEntryById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows[0]);
    });
};

const writeEntry = async(req, res) => {
    const { title, content, author, node, points, created } = req.body;

    await pool.query(insertEntry,
        [title, content, author, node, points, created],
        (error, results) => {
            if (error) throw error;
            res.status(201).json(results.rows[0]);
    });
};

// http://localhost:4000/entries
router.get('/', poolEntries);
router.get('/:id', readEntry);
router.put('/:id', editEntry);
router.get('/node/:name', poolNodeEntries);
router.post('/', middleJWT.authToken, writeEntry);
router.delete('/:id', middleJWT.authToken, deleteEntry);

module.exports = router;