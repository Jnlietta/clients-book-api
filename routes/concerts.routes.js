const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all concerts
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});
 
// get concert by id
router.route('/concerts/:id').get((req, res) => {
    const id = parseInt(req.params.id);    
    const concert = db.concerts.find(concert => concert.id === id);
  
    res.json(concert);
});
  
// add concert
router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image  } = req.body;
    const nextId = uuidv4();
    const newConcert = { id: nextId, performer: performer, genre: genre, price: price, day: day, image: image };
    db.concerts.push(newConcert);
    const succes = { message: 'OK' }
  
    res.json(succes);
});

// make changes in concerts data
router.route('/concerts/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    const { performer, genre, price, day, image } = req.body;
    const concert = db.concerts.find(concert => concert.id === id);
    concert.performer = performer;
    concert.genre = genre;
    concert.price = price;
    concert.day = day;
    concert.image = image;
    const succes = { message: 'OK' }
  
    res.json(succes);
});
  
// delete concert
router.route('/concerts/:id').delete((req, res) => {
    const id = parseInt(req.params.id);
    const concert = db.concerts.find(concert => concert.id === id);
    const indexOfConcert = db.concerts.indexOf(concert);
    db.concerts.splice(indexOfConcert, 1);
    const succes = { message: 'OK' }
  
    res.json(succes);
});

module.exports = router;