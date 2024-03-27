const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller');

// get all seats
router.get('/seats', SeatController.getAll);

// get seat by id
router.get('/seats/:id', SeatController.getById);

// add seat
router.post('/seats', SeatController.postNew);

// make changes in seats data
router.put('/seats/:id', SeatController.putById);

// delete seat
router.delete('/seats/:id', SeatController.deleteById);

module.exports = router;