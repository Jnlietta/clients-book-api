const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  ];

app.get('/testimonials', (req, res) => {//dziala
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {//dziala

    const id = parseInt(req.params.id);    
    const client = db.find(client => client.id === id);

    res.json(client);
  });

app.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * db.length);
    const randomClient = db[randomIndex];

    res.json(randomClient);
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
