const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length);
    const randomClient = db.testimonials[randomIndex];

    res.json(randomClient);
});

app.get('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);    
    const client = db.testimonials.find(client => client.id === id);

    res.json(client);
  });

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
    const nextId = uuidv4();
    const newClient = { id: nextId, author: author, text: text};
    db.testimonials.push(newClient);
    const succes = { message: 'OK' }

    res.json(succes);
});

app.put('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { author, text } = req.body;
    const client = db.testimonials.find(client => client.id === id);
    client.author = author;
    client.text = text;
    const succes = { message: 'OK' }

    res.json(succes);
});

app.delete('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const client = db.testimonials.find(client => client.id === id);
    const indexOfClient = db.testimonials.indexOf(client);
    db.testimonials.splice(indexOfClient, 1);
    const succes = { message: 'OK' }

    res.json(succes);
});

app.get('/concerts', (req, res) => {
    res.json(db.concerts);
  });
  
  app.get('/concerts/:id', (req, res) => {
      const id = parseInt(req.params.id);    
      const concert = db.concerts.find(concert => concert.id === id);
  
      res.json(concert);
    });
  
  app.post('/concerts', (req, res) => {
      const { author, text } = req.body;
      const nextId = uuidv4();
      const newConcert = { id: nextId, author: author, text: text};
      db.concerts.push(newConcert);
      const succes = { message: 'OK' }
  
      res.json(succes);
  });
  
  app.put('/concerts/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const { author, text } = req.body;
      const concert = db.concerts.find(concert => concert.id === id);
      concert.author = author;
      concert.text = text;
      const succes = { message: 'OK' }
  
      res.json(succes);
  });
  
  app.delete('/concerts/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const concert = db.concerts.find(concert => concert.id === id);
      const indexOfConcert = db.concerts.indexOf(concert);
      db.concerts.splice(indexOfConcert, 1);
      const succes = { message: 'OK' }
  
      res.json(succes);
  });


  app.get('/seats', (req, res) => {
    res.json(db.seats);
  });
  
  app.get('/seats/:id', (req, res) => {
      const id = parseInt(req.params.id);    
      const seat = db.seats.find(seat => seat.id === id);
  
      res.json(seat);
    });
  
  app.post('/seats', (req, res) => {
      const { author, text } = req.body;
      const nextId = uuidv4();
      const newSeat = { id: nextId, author: author, text: text};
      db.seats.push(newSeat);
      const succes = { message: 'OK' }
  
      res.json(succes);
  });
  
  app.put('/seats/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const { author, text } = req.body;
      const seat = db.seats.find(seat => seat.id === id);
      seat.author = author;
      seat.text = text;
      const succes = { message: 'OK' }
  
      res.json(succes);
  });
  
  app.delete('/seats/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const seat = db.seats.find(seat => seat.id === id);
      const indexOfSeat = db.seats.indexOf(seat);
      db.seats.splice(indexOfSeat, 1);
      const succes = { message: 'OK' }
  
      res.json(succes);
  });

app.use((req, res) => {
    const failure = { message: 'Not found...' };

    res.status(404).json(failure);
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
