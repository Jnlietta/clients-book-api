const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

// get all concerts
router.get('/concerts', ConcertController.getAll);

// get concert by id
router.get('/concerts/:id', ConcertController.getById);

// add concert
router.post('/concerts', ConcertController.postNew);

// make changes in concerts data
router.put('/concerts/:id', ConcertController.putById);

// delete concert
router.delete('/concerts/:id', ConcertController.deleteById);

module.exports = router;