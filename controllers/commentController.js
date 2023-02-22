"use strict";
const CommentsDB = require('../models/CommentsDB');
const Comment = require('../models/Comment');

var commentsDB = new CommentsDB();

function getAllComments(request, respond) {
  commentsDB.getAllComments(function (error, result) {
    if (error) {
      respond.json(error);
    }
    else {
      respond.json(result);
    }
  });
}

function addComment(request, respond) {
  var now = new Date();
  var comment = new Comment(null, request.body.restaurant_id, request.body.user_id, request.body.review_text, now.toString(), request.body.rating);
  console.log(comment);
  commentsDB.addComment(comment, function (error, result) {
    if (error) {
      respond.json(error);
    }
    else {
      respond.json(result);
    }
  })
};

function updateComment(request, respond) {
  var now = new Date();
  var comment = new Comment(parseInt(request.params.id), null, null, request.body.review_text, now.toString(), request.body.rating);
  commentsDB.updateComment(comment, function (error, result) {
    if (error) {
      respond.json(error);
    }
    else {
      respond.json(result);
    }
  });
}

function deleteComment(request, respond) {
  var commentID = request.params.id;
  commentsDB.deleteComment(commentID, function (error, result) {
    if (error) {
      respond.json(error);
    }
    else {
      respond.json(result);
    }
  });
}

function getCommentById(request, respond) {
  var user_id = request.params.id;
  commentsDB.getCommentById(user_id, function (error, result) {
    if (error) {
      respond.json(error);
    }
    else {
      respond.json(result);
    }
  });
}

module.exports = { getAllComments, addComment, updateComment, deleteComment, getCommentById };




/*
function addComment(request, respond){
  var now=new Date();
  var comment=new Comment(null,request.body.restaurant_id, request.body.user_id, request.body.Comment_text,now,request.body.rating);
  commentsDB.addComment(comment,function(error,result){
    if(error){
      respond.json(error);
    }
    else{
      respond.json(result);
    }
  })
};

function updateComment(request,respond){
  var now=new Date();
  var comment=new Comment(parseInt(request.params.id),request.body.restaurant_id,request.body.user_id,request.body.Comment_text,now,request.body.rating);
  commentsDB.updateComment(comment,function(error,result){
    if(error){
      respond.json(error);
    }
    else{
      respond.json(result);
    }
  });
}

function deleteComment(request,respond){
  var commentID=request.params.id;
  commentsDB.deleteComment(commentID, function(error,result){
    if(error){
      respond.json(error);
    }
    else{
      respond.json(result);
    }
  });
}
*/

