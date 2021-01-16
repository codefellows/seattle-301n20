'use strict';

const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// Dummy Data
const listArray = [
  {
    name: 'apples',
    qty: 3
  },
  {
    name: 'potatos',
    qty: 12
  },
  {
    name: 'orange',
    qty: 1
  },
  {
    name: 'strawberries',
    qty: 6
  },
];


// Routes

app.get('/', homeHandler);
app.get('/list', listHandler);



// Function handlers
function homeHandler(request, response){
  response.status(200).render('index');
}

function listHandler(request, response){
  response.status(200).render('list', {data: listArray});
}


app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});