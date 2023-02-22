"use strict";

var db = require('../db-connections');
class CommentsDB {
  //get all reviews
  getAllComments(callback) {
    var sql = "SELECT review.review_id,review.user_id,review.restaurant_id,restaurant.restaurant_name,user.username,review.review_text,review.rating, review.date_posted FROM ((review INNER JOIN user ON review.user_id=user.user_id) INNER JOIN restaurant ON review.restaurant_id=restaurant.restaurant_id)";
    db.query(sql, callback);
  }
  //add new reviews
  addComment(review, callback) {
    var sql = "INSERT INTO review(restaurant_id,user_id,review_text,date_posted,rating) VALUES(?,?,?,?,?)";
    db.query(sql, [review.getRestaurantId(), review.getUserId(), review.getReviewText(), review.getDatePosted(), review.getRating()], callback);

  }
  //edit review
  updateComment(review, callback) {
    console.log(review.getReviewText(), review.getDatePosted(), review.getRating(), review.getReviewId())
    var sql = "UPDATE review SET review_text=?, date_posted=?, rating=? WHERE review_id=?";
    db.query(sql, [review.getReviewText(), review.getDatePosted(), review.getRating(), review.getReviewId()], callback);

  }
  //delete reviews
  deleteComment(review_id, callback) {
    var sql = "DELETE from review WHERE review_id = ?";
    return db.query(sql, [review_id], callback);
  }

  getCommentById(user_id, callback) {
    var sql = "SELECT * FROM restaurant_review.review WHERE user_id=?"
    return db.query(sql, [user_id], callback);
  }

}


module.exports = CommentsDB;