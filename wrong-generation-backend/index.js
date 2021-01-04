require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const Chart = require('./models/chart');


const app = express();
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan('tiny'));


app.get('/api/charts', (request, response, next) => {
    Chart.find( { date: request.query.chart_date } )
      .then((chart) => {
        response.json(chart);
      })
      .catch((error) => next(error));
});


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
  };
  
  app.use(unknownEndpoint);
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message);
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' });
    }
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message });
    }
  
    next(error);
  };
  
  app.use(errorHandler);
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });