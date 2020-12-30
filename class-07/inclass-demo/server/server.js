'use strict';

// Bring in my dependencies/modules
  // Install/Download Dependencies (exists outside server.js)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

// Start my application
// Specify your port
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// Routes

app.get('/', homeHandler);
app.get('/location', locationHandler);
app.get('/restaurants', restaurantHandler);


// Function Handlers

function homeHandler(request, response){
  response.status(200).send('hello world');
}

function locationHandler(request, response) {
  let city = request.query.city;
  let key = process.env.GEOCODE_API_KEY;
  const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;

  superagent.get(url)
    .then( data => {
      // Create our objects based on our constructor
      const locationData = data.body[0];
      const location = new Location(city, locationData);
      response.status(200).send(location);
    });
}

function restaurantHandler(request, response) {
  // build the request to our Zomato API
  const url = `https://developers.zomato.com/api/v2.1/geocode?lat=${request.query.latitude}&lon=${request.query.longitude}`;

  superagent.get(url)
    .set('user-key', process.env.ZOMATO_API_KEY)
    .then(data => {
      const restaurantData = [];

      data.body.nearby_restaurants.forEach( entry => {
        restaurantData.push(new Restaurant(entry));
      });
      console.log(restaurantData);
      response.status(200).send(restaurantData);

    });

}


// Constructors
function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.display_name;
  this.latitude = geoData.lat;
  this.longitude = geoData.lon;
}

function Restaurant(entry) {
  this.restaurant = entry.restaurant.name;
  this.cuisines = entry.restaurant.cuisines;
  this.locality = entry.restaurant.location.locality;
}


// Listening on the correct port
app.listen(PORT, () => {
  console.log('Now listening on port', PORT);
});

// app.listen(PORT, function() {
//   console.log('Now listening on port', PORT);
// });

// app.listen(PORT, listenPort(PORT));

// function listenPort(port){
//   console.log('now listening on port', port);
// }
