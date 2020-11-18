'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const pg = require('pg');

// Application Setup
const PORT = process.env.PORT;
const app = express();

// Database Connection Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => {throw err;});

// Routes
app.get('/', (request, response) => {
  response.status(200).send('ok');
});

// Add People, based on QueryString Params
app.get('/add', (request, response) => {
  let firstName = request.query.first;
  let lastName = request.query.last;
  let SQL = 'INSERT INTO people (first_name, last_name) VALUES ($1, $2) RETURNING *';
  let safeValues = [firstName, lastName];
  client.query(SQL, safeValues)
    .then( results => {
      response.status(200).json(results);
    })
    .catch( error => {
      console.log('ERROR', error);
      response.status(500).send('So sorry, something went wrong.');
    });
});

// Get everything in the database
// Stretch goal ... do it with a where
app.get('/people', (request, response) => {
  let SQL = 'SELECT * FROM people';
  client.query(SQL)
    .then( results => {
      response.status(200).json(results.rows);
    })
    .catch( error => {
      console.log('ERROR', error);
      response.status(500).send('So sorry, something went wrong.');
    });
});

// Error Handler Routes
app.use('*', notFoundHandler);

function notFoundHandler(request,response) {
  response.status(404).send('huh?');
}

// Connect to DB and Start the Web Server
client.connect()
  .then( () => {
    app.listen(PORT, () => {
      console.log('Server up on', PORT);
    });
  })
  .catch(err => {
    console.log('ERROR', err);
  });

