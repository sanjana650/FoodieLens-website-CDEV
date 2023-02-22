//needed for updating and adding of comments not to get all comments

"use strict";

class Comment {
  constructor(review_id, restaurant_id, user_id, review_text, date_posted, rating) {
    this.review_id = review_id;
    this.restaurant_id = restaurant_id;
    this.user_id = user_id;
    this.review_text = review_text;
    this.date_posted = date_posted;
    this.rating = rating;
  }
  //add set and get methods

  getReviewId() {
    return this.review_id;
  }
  getRestaurantId() {
    return this.restaurant_id;
  }
  getUserId() {
    return this.user_id;
  }
  getReviewText() {
    return this.review_text;
  }
  getDatePosted() {
    return this.date_posted;
  }
  getRating() {
    return this.rating;
  }

  setReviewId(review_id) {
    this.review_id = review_id;
  }
  setRestaurantId(restaurant_id) {
    this.restaurant_id = restaurant_id;
  }
  setUserId(user_id) {
    this.user_id = user_id;
  }
  setReviewText(review_text) {
    this.review_text = review_text;
  }
  setDatePosted(date_posted) {
    this.date_posted = date_posted;
  }
  setRating(rating) {
    this.rating = rating
  }
}

module.exports = Comment;