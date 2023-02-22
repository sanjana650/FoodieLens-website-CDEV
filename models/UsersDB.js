"use strict";

var db = require('../db-connections');
class UsersDB {
  getAllUsers(callback) {
    var sql = "SELECT * from restaurant_review.user";
    db.query(sql, callback);
  }

  getUser(username, callback) {
    var sql = "SELECT distinct username, email, password from restaurant_review.user WHERE username=?";
    db.query(sql, [username], callback);
  }

  //return back a record with the username 
  loginUser(username, callback) {
    var sql = "SELECT user_id,password,username,email from restaurant_review.user WHERE username=?";
    db.query(sql, [username], callback);
  }

  addUser(username, email, password, callback) {
    var sql = "INSERT INTO user(username,email,password) VALUES(?,?,?)";
    db.query(sql, [username, email, password], callback);

  }
  /* original
  updateUser(username, email, callback) {
    var sql = "UPDATE user SET email=? WHERE username=?";
    return db.query(sql, [email, username], callback);

  }
  */

  updateUser(username, email, callback) {
    var sql = "UPDATE user SET email=? WHERE username=?";
    return db.query(sql, [email, username], callback);

  }

  // deleteUser(user_id, callback) {
  //   var sql = "DELETE from user WHERE user_id = ?";
  //   return db.query(sql, [user_id], callback);
  // }

}

module.exports = UsersDB;

