'use strict';

require('dotenv').config();
const express = require('express');
const pg= require('pg');

const PORT = process.env.PORT || 3000;
const app = express();
const client = new pg.Client(process.env.DATABASE_URL);

client.on('error', err => {
  throw err;
});

app.get('/', (request, response) => {
  response.status(200).send('Hello World');
});

app.get('/add', (request, response) => {
  // console.log(request.query);
  let firstName = request.query.first_name;
  let lastName = request.query.last_name;

  let SQL = 'INSERT INTO people (first_name, last_name) VALUES ($1, $2) RETURNING *'; // referencing columns

  let safeValues = [firstName, lastName]; // parameterized queries

  client.query(SQL, safeValues)
    .then( results => {
      response.status(200).json(results);
    })
    .catch(error => {
      console.log(error);
    });
});


// start database
client.connect()
  .then( () => {
    app.listen(PORT, () => {
      console.log(`Now listening on port ${PORT}`);
      console.log(`Connected to database ${client.connectionParameters.database}`);
    });
  });
