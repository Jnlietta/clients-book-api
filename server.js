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

app.use((req, res) => {
    const failure = { message: 'Not found...' };

    res.status(404).json(failure);
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
