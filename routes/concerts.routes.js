const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

// get all concerts
router.get('/concerts', ConcertController.getAll);

// get concert by id
router.get('/concerts/:id', ConcertController.getById);

// get all concerts with the same performer
router.get('/concerts/performer/:performer', ConcertController.getByPerformer);

// get all concerts with the same genre
router.get('/concerts/genre/:genre', ConcertController.getByGenre);

// get all concerts with price between params price_min and price_max
router.get('/concerts/price/:price_min/price_max', ConcertController.getByPrice);

// get all concerts with the same day
router.get('/concerts/day/:day', ConcertController.getByDay);

// add concert
router.post('/concerts', ConcertController.postNew);

// make changes in concerts data
router.put('/concerts/:id', ConcertController.putById);

// delete concert
router.delete('/concerts/:id', ConcertController.deleteById);

module.exports = router;