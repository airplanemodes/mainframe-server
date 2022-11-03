const psql = require('pg');
const { Router } = require('express');
const router = Router();

const { selectEntries, 
        selectEntry, 
        createEntry } = require('../database/queries');


const pool = new psql.Pool({
    user: "postgres",
    host: "localhost",
    database: "mainframe",
    port: 5432
});



const poolEntries = async(req, res) => {
    pool.query(selectEntries, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const readEntry = async(req, res) => {
    const id = req.url.slice(1, req.url.length);
    await pool.query(selectEntry, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows[0]);
    });
};

const deleteEntry = async(req, res) => {
    // TODO: delete function
    res.send('DELETE request');
};

const writeEntry = async(req, res) => {
    const { title, content, author, node, created } = req.body;

    await pool.query(createEntry, [title, content, author, node, created], (error, results) => {
        if (error) throw error;
        res.status(201).json(results.rows[0]);
    });
};

// http://localhost:4000/entries
router.get('/', poolEntries);
router.post('/', writeEntry);
router.get('/:id', readEntry);
router.delete('/:id', deleteEntry);

module.exports = router;