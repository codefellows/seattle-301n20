'use strict';

// bringing in dependencies
require('dotenv').config();
const express = require('express');
const app = express();


const PORT = process.env.PORT || 3000;


app.use(express.static('./public'));

// routes

app.get('/hello', (request, response) => {
  response.send('hello');
});


app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
