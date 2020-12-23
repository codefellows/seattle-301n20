'use strict';

// Step 1:  Bring in our modules/dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Step 2:  Set up our application
const app = express();
const PORT = process.env.PORT;
app.use(cors());

// Routes

app.get('/', homeHandler);
app.get('/location', locationHandler);
app.get('/restaurants', restaurantHandler);
app.use('*', notFoundHandler);


// Function Handlers
function locationHandler(request, response) {
  // This function will do two things:
  // request data from our files
  // tailor/normalize the data using a constructor
  // respond with the data (show up in the browser)
  const location = require('./data/location.json');
  const city = request.query.city;
  const locationData = new Location(city, location);

  response.send(locationData);

}
function homeHandler(request, response) {
  response.send('Hello World');
}
function notFoundHandler(request, response){
  response.send('404.  Sorry!');
}
function restaurantHandler(request, response) {
  // This function will do two things:
  // request data from our files
  // tailor/normalize the data using a constructor
  // respond with the data (show up in the browser)
  const data = require('./data/restaurants.json');
  const restaurantArr = [];
  data.nearby_restaurants.forEach(restaurant => {
    restaurantArr.push(new Restaurant(restaurant));
  });
  response.send(restaurantArr);
}


// Constructor
function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}

function Restaurant(result) {
  this.restaurant = result.restaurant.name;
  this.cuisines = result.restaurant.cuisines;
  this.locality = result.restaurant.location.locality;
}



// Start our server!
app.listen(PORT, () => {
  console.log(`Now listening on port, ${PORT}`);
});
