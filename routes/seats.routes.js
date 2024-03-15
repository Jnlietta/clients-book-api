const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all seats
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});
 
// get seat by id
router.route('/seats/:id').get((req, res) => {
    const id = parseInt(req.params.id);    
    const seat = db.seats.find(seat => seat.id === id);
  
    res.json(seat);
});
  
// add seat
router.route('/seats').post((req, res) => {
    const { author, text } = req.body;
    const nextId = uuidv4();
    const newSeat = { id: nextId, author: author, text: text};
    db.seats.push(newSeat);
    const succes = { message: 'OK' }
  
    res.json(succes);
});

// make changes in seats data
router.route('/seats/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    const { author, text } = req.body;
    const seat = db.seats.find(seat => seat.id === id);
    seat.author = author;
    seat.text = text;
    const succes = { message: 'OK' }
  
    res.json(succes);
});
  
// delete seat
router.route('/seats/:id').delete((req, res) => {
    const id = parseInt(req.params.id);
    const seat = db.seats.find(seat => seat.id === id);
    const indexOfSeat = db.seats.indexOf(seat);
    db.seats.splice(indexOfSeat, 1);
    const succes = { message: 'OK' }
  
    res.json(succes);
});

module.exports = router;