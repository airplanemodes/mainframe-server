const { Router } = require('express');
const router = Router();
const pool = require('../database/pool');
const middleJWT = require('../token');
const { 
  selectPrivates, 
  insertPrivate,
  senderDelete,
  senderRecover,
  receiverDelete,
  receiverRecover,
  senderFullDelete,
  receiverFullDelete
} = require('../database/queries');



const poolPrivates = async(req, res) => {
  await pool.query(selectPrivates, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
}

const sendPrivate = async(req, res) => {
  const { sender, receiver, body, subject } = req.body;
  await pool.query(insertPrivate,
    [sender, receiver, body, subject], 
    (error, results) => {
      if (error) throw error;
      res.status(201).send('message delivered');
    });
}

const receiverDel = async(req, res) => {
  const id = req.params.id;
  await pool.query(receiverDelete, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
}

const senderDel = async(req, res) => {
  const id = req.params.id;
  await pool.query(senderDelete, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
}

const receiverRec = async(req, res) => {
  const id = req.params.id;
  await pool.query(receiverRecover, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
}

const senderRec = async(req, res) => {
  const id = req.params.id;
  await pool.query(senderRecover, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
}

const receiverFullDel = async(req, res) => {
  const id = req.params.id;
  await pool.query(receiverFullDelete, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
}

const senderFullDel = async(req, res) => {
  const id = req.params.id;
  await pool.query(senderFullDelete, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
}

// http://localhost:4000/privates
router.get('/', middleJWT.authToken, poolPrivates);
router.post('/', middleJWT.authToken, sendPrivate);
router.put('/receiver-del/:id', middleJWT.authToken, receiverDel);
router.put('/sender-del/:id', middleJWT.authToken, senderDel);
router.put('/receiver-rec/:id', middleJWT.authToken, receiverRec);
router.put('/sender-rec/:id', middleJWT.authToken, senderRec);
router.put('/receiver-fulldel/:id', middleJWT.authToken, receiverFullDel);
router.put('/sender-fulldel/:id', middleJWT.authToken, senderFullDel);

module.exports = router;