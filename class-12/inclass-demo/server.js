'use strict';

// Application dependencies
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const cors = require('cors');
const { response } = require('express');

// Start our application
const app = express();
app.use( cors() );
const PORT = process.env.PORT || 3000;

// Create my database connection
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Express Middleware
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));

// Set the view engine for server-side rendering
app.set('view engine', 'ejs');


// Routes
app.get('/', getTasks);
app.get ('/tasks/:task_id', getoneTask);



// Function handlers
function getTasks(req, res) {
  // talk to my database!
  const SQL = 'SELECT * FROM tasks;';
  return client.query(SQL)
    .then(results => {
      console.log(results.rows);
      res.render('index', {data: results.rows});
    });
}

function getoneTask(req, res) {
  console.log(req.params);
  const SQL = 'SELECT * FROM tasks WHERE id = $1';
  const values = [req.params.task_id];

  client.query(SQL, values)
    .then(results => {
      console.log(results.rows[0]);
      res.render('pages/detail-view', {data: results.rows[0]});
    });
}

// Start our server
app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
  console.log('Connected to database>>', client.connectionParameters.database);
});
