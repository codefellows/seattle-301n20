'use strict';


// Bring in my dependencies
const express = require('express');
require('dotenv').config();

// Start my application
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));


// Routes!
app.get('/', homeHandler);
app.post('/contact', contactHandler);


// Handler functions
function homeHandler(request, response) {
  response.status(200).sendFile('./index.html');
}

function contactHandler(request, response) {
  console.log('contact route!');
  console.log('request.body.first_name>>', request.body);
  response.status(200).json('thanks!');
}


// Listen on a port
app.listen(PORT, () => console.log(`now listening on port ${PORT}`));

