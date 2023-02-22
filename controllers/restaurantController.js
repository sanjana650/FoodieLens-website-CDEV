"use strict";
const RestaurantsDB = require('../models/RestaurantsDB');

var restaurantsDB = new RestaurantsDB();

function getAllRestaurants(request, respond) {
  restaurantsDB.getAllRestaurants(function (error, result) {
    if (error) {
      respond.json(error);
    }
    else {
      respond.json(result);
    }
  });
}

function getRestaurantByCategory(request, respond) {

  console.log("my request is " + request.params)
  var categories_id = request.params.id;
  restaurantsDB.getRestaurantByCategory(categories_id, function (error, result) {
    if (error) {
      respond.json(error);
    }
    else {
      respond.json(result);
    }
  });

}

/*
function getRestaurantByCategoryName(request, respond) {
  var category_name = request.params.id;
  //var category_name=request.params.
  restaurantsDB.getRestaurantByCategoryName(category_name, function (error, result) {
    if (error) {
      
    else {
      respond.json(result);
    }
  });

}
*/


function searchRestaurants(request, respond) {
  //console.log(request.params.id);
  var restuarant_name = request.params.id;
  //console.log(restuarant_name);
  restaurantsDB.searchRestaurants(restuarant_name, function (error, result) {
    if (error) {
      respond.json(error);
    }
    else {
      respond.json(result);
    }
  });
}

module.exports = { getAllRestaurants, getRestaurantByCategory, searchRestaurants };