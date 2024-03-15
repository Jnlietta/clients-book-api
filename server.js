const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  ];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * db.length);
    const randomClient = db[randomIndex];

    res.json(randomClient);
});

app.get('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);    
    const client = db.find(client => client.id === id);

    res.json(client);
  });

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
    const nextId = uuidv4();
    const newClient = { id: nextId, author: author, text: text};
    db.push(newClient);
    const succes = { message: 'OK' }

    res.json(succes);
});

app.put('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { author, text } = req.body;
    const client = db.find(client => client.id === id);
    client.author = author;
    client.text = text;
    const succes = { message: 'OK' }

    res.json(succes);
});

app.delete('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const client = db.find(client => client.id === id);
    const indexOfClient = db.indexOf(client);
    db.splice(indexOfClient, 1);
    const succes = { message: 'OK' }

    res.json(succes);
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
