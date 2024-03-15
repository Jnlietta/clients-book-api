const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all testimonials
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});
 
// get random client
router.route('/testimonials/random').get((req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length);
    const randomClient = db.testimonials[randomIndex];
  
    res.json(randomClient);
});
 
// get client by id
router.route('/testimonials/:id').get((req, res) => {
    const id = parseInt(req.params.id);    
    const client = db.testimonials.find(client => client.id === id);
  
    res.json(client);
});
  
// add client
router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    const nextId = uuidv4();
    const newClient = { id: nextId, author: author, text: text};
    db.testimonials.push(newClient);
    const succes = { message: 'OK' }
  
    res.json(succes);
});

// make changes in clients data
router.route('/testimonials/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    const { author, text } = req.body;
    const client = db.testimonials.find(client => client.id === id);
    client.author = author;
    client.text = text;
    const succes = { message: 'OK' }
  
    res.json(succes);
});
  
// delete client
router.route('/testimonials/:id').delete((req, res) => {
    const id = parseInt(req.params.id);
    const client = db.testimonials.find(client => client.id === id);
    const indexOfClient = db.testimonials.indexOf(client);
    db.testimonials.splice(indexOfClient, 1);
    const succes = { message: 'OK' }
  
    res.json(succes);
});

module.exports = router;