const express = require('express');
var cors = require('cors')
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(helmet());
app.use(cors());
// Serve static files from the React app
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  const failure = { message: 'Not found...' };

  res.status(404).json(failure);
});

// connects our backend code with the database
const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = 'mongodb+srv://juliawglinka:${process.env.DB_PASS}@cluster0.ejrpgdi.mongodb.net/NewWaveDB?retryWrites=true&w=majority&appName=Cluster0';
else if(NODE_ENV === 'test') dbUri = 'mongodb://0.0.0.0:27017/NewWaveDBtest';
else dbUri = 'mongodb://0.0.0.0:27017/NewWaveDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');
});

module.exports = server;