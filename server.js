const express = require('express');
var cors = require('cors')

const app = express();

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
    const failure = { message: 'Not found...' };

    res.status(404).json(failure);
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
