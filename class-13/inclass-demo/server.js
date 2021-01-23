'use strict';

// Bring in my dependencies
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const methodOverride = require('method-override');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Application configurations (middleware)
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method')); // allow to PUT and DELETE

// View engine
app.set('view engine', 'ejs');  // allows us to use ejs, and looks in a 'views' directory for those files

// Send a public facing directory for our CSS
app.use(express.static('./public'));

// Database connection
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.error(error));

// Create a default route

app.get('/', getAllTasks);
app.get('/add', showForm);
app.post('/new', addTask);
app.get('/tasks/:task_id', detailHandler);
app.delete('/delete/:task_id', deleteTask);
app.put('/update/:task_id', updateTask);

// Function handlers

function updateTask(request, response){
  const SQL = 'UPDATE tasks SET status=$1 WHERE id = $2';
  const params = ['complete', request.params.task_id];

  client.query(SQL, params)
    .then(data => {
      console.log(data.rowCount);
      response.status(200).redirect('/');
    });
}

function deleteTask(request, response){
  console.log('request.params for DELETE >>', request.params);
  const SQL = 'DELETE FROM tasks WHERE id = $1';
  const params = [request.params.task_id];

  client.query(SQL, params)
    .then(data => {
      console.log(data.rowCount);
      response.status(200).redirect('/');
    });
}

function getAllTasks(request, response){
  const SQL = 'SELECT * FROM tasks';

  client.query(SQL)
    .then(data => {
      response.status(200).render('index', {data: data.rows});
    });

}

function showForm(request, response){
  response.status(200).render('pages/form');
}

function addTask(request, response){
  console.log(request.body);
  const SQL = 'INSERT INTO tasks (title, description, contact, status, category) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const params = [request.body.title, request.body.description, request.body.contact, request.body.status, request.body.category];

  client.query(SQL, params)
    .then(data => {
      console.log(`added ${data.rowCount} row(s)`);
      response.redirect('/');
    });
}

function detailHandler(request, response){
  console.log(request.params);
  const SQL = 'SELECT * FROM tasks WHERE id=$1';
  const params = [request.params.task_id];

  client.query(SQL, params)
    .then(data => {
      console.log('data>>', data.rows[0]);
      response.render('pages/detail', {data: data.rows[0]});
    });
}

// Start our application
client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`now listening on port ${PORT}`);
    });
  });
