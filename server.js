const express = require('express');
// const {v4: uuidv4} = require('uuid');
//const db = require('./db.js');
// const testimonialsRoutes = require('./routes/testimonials.routes');

const app = express();
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');


app.use(
  express.urlencoded( {extended: 'true'} )
);

app.use(
  express.json()
);

app.use('/api', testimonialsRoutes);

app.use('/api', concertsRoutes);

app.use('/api', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({message: '404... not found'});
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});