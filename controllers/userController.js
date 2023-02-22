"use strict";
const UsersDB = require('../models/UsersDB');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = 'secretkey'
var curr_user_id;

var usersDB = new UsersDB();

function getAllUsers(request, respond) {
  usersDB.getAllUsers(function (error, result) {
    if (error) {
      respond.json(error);
    }
    else {
      respond.json(result);
    }
  });
}

function addUser(request, respond) {
  var username = request.body.username;
  var email = request.body.email;
  var password = request.body.password;
  var token = request.body.token;
  password = bcrypt.hashSync(password, 10); //encrypt password using bcrypt library

  usersDB.addUser(username, email, password, function (error, result) {
    if (error) {
      respond.json(error);
    }
    else {
      respond.json(result);
    }
  })
};


function loginUser(request, respond) {
  var username = request.body.username;
  var password = request.body.password;

  usersDB.loginUser(username, function (error, result) {
    if (error) {
      respond.json(error);
    }
    else {
      console.log(result[0].password);
      const hash = result[0].password;
      var flag = bcrypt.compareSync(password, hash); //checks if encrypted password is same as original password 
      if (flag) {
        var token = jwt.sign(username, secret)
        curr_user_id = result[0].user_id;
        respond.json({ result: token, user_id: curr_user_id, username: result[0].username, email: result[0].email });
        console.log("curr_user_id is", curr_user_id);
      } else {
        respond.json({ result: "invalid" });
      }
    }
  })
};


function getUser(request, respond) {
  var token = request.body.token;
  try {
    var decoded = jwt.verify(token, secret);
    usersDB.getUser(decoded, function (error, result) {
      if (error) {
        respond.json(error);
      }
      else {
        respond.json(result);
      }
    });

  } catch (error) {
    respond.json({ result: "invalid token" });
  }
}

function updateUser(request, respond) {
  //var username = request.body.username;
  var email = request.body.email;
  //var profile_picture = request.body.profile_picture;
  //var password=request.body.password;
  var token = request.body.token;
  try {
    //username is replaced by decoded
    var decoded = jwt.verify(token, secret);
    console.log("controller ->", decoded, email);
    usersDB.updateUser(decoded, email, function (error, result) {
      if (error) {
        respond.json(error);
      }
      else {
        respond.json(result);
      }
    });
  } catch (error) {
    respond.json({ result: "invalid token" });
  }
}

/* original
function updateUser(request, respond) {
  var username = request.body.username;
  var email = request.body.email;
  var token = request.body.token;
  try {
    var decoded = jwt.verify(token, secret);
    usersDB.updateUser(username, email, function (error, result) {
      if (error) {
        respond.json(error);
      }
      else {
        respond.json(result);
      }
    });
  } catch (error) {
    respond.json({ result: "invalid token" });
  }
}

*/

// function deleteUser(request, respond) {
//   var userID = request.params.id;
//   usersDB.deleteUser(userID, function (error, result) {
//     if (error) {
//       respond.json(error);
//     }
//     else {
//       respond.json(result);
//     }
//   });
// }

module.exports = { getAllUsers, addUser, updateUser, loginUser, curr_user_id, getUser };