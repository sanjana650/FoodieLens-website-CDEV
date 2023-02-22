"use strict";


var db = require('../db-connections');
class RestaurantsDB {
  //get all restaurants
  getAllRestaurants(callback) {
    var sql = "SELECT restaurant.restaurant_id,restaurant.restaurant_name,restaurant.price_range,restaurant.telephone_number,restaurant.website_link,restaurant.restaurant_logo,restaurant.bigger_restaurant_logo,restaurant.location,restaurant.address,restaurant.latitude,restaurant.longtitude,category.category_name FROM restaurant INNER JOIN category ON restaurant.categories_id=category.category_id";
    db.query(sql, callback);
  }

  //filter restaurants by category
  getRestaurantByCategory(categories_id, callback) {
    var sql = "SELECT restaurant.restaurant_id,restaurant.restaurant_name,restaurant.price_range,restaurant.telephone_number,restaurant.website_link,restaurant.restaurant_logo,restaurant.bigger_restaurant_logo,restaurant.location,restaurant.address,restaurant.latitude,restaurant.longtitude,category.category_name FROM restaurant INNER JOIN category ON restaurant.categories_id=category.category_id WHERE category_name=? ";
    db.query(sql, [categories_id], callback)
  }


  //search restaurants by keyword
  searchRestaurants(restaurant_name, callback) {
    //console.log(restaurant_name);
    var key = "%" + restaurant_name + "%";
    //console.log(key);
    var sql = "select res.restaurant_name,res.restaurant_id, res.restaurant_logo,res.bigger_restaurant_logo, res.price_range,res.telephone_number,res.website_link,res.location,res.address, cat.category_name from restaurant res join category cat on cat.category_id = res.categories_id where res.restaurant_name LIKE ?";
    db.query(sql, [key], callback)
  }


}


module.exports = RestaurantsDB;

