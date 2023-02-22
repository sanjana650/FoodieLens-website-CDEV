
//to fetch comment data into comments array
function fetchComments() {
  var request = new XMLHttpRequest();
  restaurant_id = sessionStorage.getItem("restaurant_id")

  request.open('GET', comment_url, true);

  //This command starts the calling of the comments api
  request.onload = function () {
    //get all the comments records into our comments array
    comment_array = JSON.parse(request.responseText);
    console.log(comment_array);
  };

  request.send();
}



//This function is to display all the comments of that movie
//whenever the user click on the "comment" button
function showRestaurantComments(element) {

  var token = sessionStorage.getItem("token");
  var user_id = sessionStorage.getItem("user_id");
  if (token == null) {
    //if no token exists then the newComment button will not show
    document.getElementById("newComment").style.display = "none";
  }
  else {
    //if token exists the previous if condition is blocked and the button shows
    document.getElementById("newComment").style.display = "block";
  }
  document.getElementById("emptyComment").innerHTML = "No review yet. Create one now";
  //restaurant_id is referred to as item
  var item = element.getAttribute("item");
  currentIndex = item;

  var restaurant_name = '';
  //var restaurant_name = restaurant_array[item].restaurant_name;
  //var restaurant_id = restaurant_array[item].restaurant_id;

  for (var i = 0; i < restaurant_array.length; i++) {
    if (restaurant_array[i].restaurant_id == item) {
      restaurant_name = restaurant_array[i].restaurant_name;
    }
  }

  document.getElementById("review").textContent = "Review for " + restaurant_name;
  document.getElementById("commentBody").textContent = "";

  for (var i = 0; i < comment_array.length; i++) {
    if (comment_array[i].restaurant_id == item) {
      document.getElementById("emptyComment").innerHTML = "";
      selectedRestaurantName = restaurant_name;


      star = "";
      console.log("line 31-", comment_array[i].review_text);
      var html = '<div class="text-center" style="width:100%;"> \<div class="card"> \<div class="card-body"> \<p class="card-text" id="rating' + i + '">' + comment_array[i].review_text + "</p> \<small>by " + comment_array[i].username + " @ " + comment_array[i].date_posted + "</small> \</div> \</div> \</div>";

      document.getElementById("commentBody").insertAdjacentHTML('beforeend', html);
      var star = "";
      for (var j = 0; j < comment_array[i].rating; j++) {
        console.log(i);
        star += "<img src='images/star.png' style='width:30px' />";
      }

      //only if the user_id is the same as the person who wrte the coment will the edit button and delete button be shown
      //console.log(curr_user_id);
      //console.log(comment_array[i].user_id)
      if (comment_array[i].user_id == user_id) {

        star += "<i class='far fa-trash-alt fa-2x edit' id='delete_icon_" + i + "' data-dismiss='modal' item='" + i + "' onClick='deleteComment(this)' ></i>";
        star += "<i class='far fa-edit fa-2x edit' id='edit_icon_" + i + "' data-toggle='modal' data-target='#editCommentModal' data-dismiss='modal' item='" + i + "' onClick='editComment(this)' ></i>";
      }

      document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");

    }
  }
}

//The purpose of this function is to clear out any (old) existing comments in the new comment modal that had been written by the user.
function newComment() {
  rating = 0;
  document.getElementById("userComments").value = "";
  //document.getElementById("nickname").value = "";

}

//add comment function
function addComment() {

  var comment = new Object();
  //comment.restaurant_id = sessionStorage.getItem("restaurant_id");
  comment.restaurant_id = currentIndex;
  comment.user_id = sessionStorage.getItem("user_id");
  //comment.comment = document.getElementById("userComments").value;
  comment.review_text = document.getElementById("userComments").value;
  comment.rating = rating;

  if (review.comment == "" || review.userRating == 0) {
    alert("Ensure all the fields are filled up!")
    return;
  }
  var postComment = new XMLHttpRequest(); // new HttpRequest instance to send comment
  postComment.open("POST", comment_url, true); //Use the HTTP POST method to send data to server
  postComment.setRequestHeader("Content-Type", "application/json");
  postComment.onload = function () {
    console.log("new comment sent");
    fetchComments(); // fetch all comments again so that the web page can have updated comments.
  };
  // Convert the data in Comment object to JSON format before sending to the server.
  postComment.send(JSON.stringify(comment));
}

//This function will hide the existing modal and present a modal with the selected comment
//so that the user can attempt to change the rating or movie review
function editComment(element) {
  var item = element.getAttribute("item");
  currentIndex = item;

  //document.getElementById("editnickname").value = comment_array[item].username;
  document.getElementById("edituserComments").value = comment_array[item].review_text;
  console.log(comment_array[item].rating);
  displayColorStar('editpop', comment_array[item].rating);
}




//This function sends the Comment data to the server for updating
function updateComment() {

  var token = sessionStorage.getItem("token");
  if (token != null) {
    var response = confirm("Are you sure you want to update this comment?");
    if (response == true) {
      var edit_comment_url = comment_url + "/" + comment_array[currentIndex].review_id;
      var updateComment = new XMLHttpRequest(); // new HttpRequest instance to send request to server
      updateComment.open("PUT", edit_comment_url, true); //The HTTP method called 'PUT' is used here as we are updating data
      updateComment.setRequestHeader("Content-Type", "application/json");

      // comment_array[currentIndex].username = document.getElementById("editnickname").value;
      comment_array[currentIndex].review_text = document.getElementById("edituserComments").value;
      comment_array[currentIndex].rating = rating;

      console.log(comment_array[currentIndex].review_text);

      updateComment.onload = function () {
        fetchComments();
      };
      updateComment.send(JSON.stringify(comment_array[currentIndex]));
    }
  }
  else {
    alert("Login before updating comments")
  }
}



//This function deletes the selected comment in a specific movie
function deleteComment(element) {
  var token = sessionStorage.getItem("token");
  if (token != null) {
    var response = confirm("Are you sure you want to delete this comment?");
    if (response == true) {
      var item = element.getAttribute("item"); //get the current item
      var delete_comment_url = comment_url + "/" + comment_array[item].review_id;
      var eraseComment = new XMLHttpRequest();
      eraseComment.open("DELETE", delete_comment_url, true);
      eraseComment.onload = function () {
        fetchComments();
      };
      eraseComment.send();
    }
  }

  else {
    alert("login before deleting")
  }
}





//This function allows the user to mouse hover the black and white popcorn
//so that it will turn to a colored version when hovered
function rateIt(element) {
  //only if token is valid (user is logged in) will the rating change
  var token = sessionStorage.getItem("token");
  if (token != null) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var stars = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    // This is another way of writing 'for' loop, which initialises the
    // popcorn images to use black and white.
    for (let star of stars) {
      star.setAttribute("src", starBWImage);
    }
    changeStarImage(num, classTarget);
  }
  else {
    for (let star of stars) {
      star.setAttribute("src", starBWImage);
      alert("Login before adding comments")
    }
  }
}


// This function sets the rating and coloured images based on the value of the image tag when
// the mouse cursor hovers over the star image.
function changeStarImage(num, classTarget) {
  switch (eval(num)) {
    case 1:
      document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
      rating = 1;
      break;
    case 2:
      document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
      document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
      rating = 2;
      break;
    case 3:
      document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
      document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
      document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
      rating = 3;
      break;
    case 4:
      document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
      document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
      document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
      document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
      rating = 4;
      break;
    case 5:
      document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
      document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
      document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
      document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
      document.querySelector(classTarget + "[value='5']").setAttribute("src", starImage);
      rating = 5;
      break;
  }
}

//This function displayS the correct number of colored popcorn
//based on the movie rating that is given in the user comment
function displayColorStar(classname, num) {
  var pop = document.getElementsByClassName(classname);
  var classTarget = "." + classname;
  for (let p of pop) {
    p.setAttribute("src", starBWImage);
  }
  changeStarImage(num, classTarget);
}




/*
//This function sends the Comment data to the server for updating
function updateComment() {

  var get_user_id = sessionStorage.getItem("user_id");
  var get_restaurant_id = sessionStorage.getItem("restaurant_id");
  console.log(comment_array);
  for (var j = 0; j < comment_array.length; j++) {
    if (comment_array[j].user_id == get_user_id) {
      var response = confirm("Are you sure you want to update this comment?");
      if (response == true) {
        var edit_comment_url = comment_url + "/" + comment_array[j].review_id;
        var updateComment = new XMLHttpRequest(); // new HttpRequest instance to send request to server
        updateComment.open("PUT", edit_comment_url, true); //The HTTP method called 'PUT' is used here as we are updating data
        updateComment.setRequestHeader("Content-Type", "application/json");

        // comment_array[currentIndex].username = document.getElementById("editnickname").value;
        comment_array[j].review_text = document.getElementById("edituserComments").value;
        comment_array[j].rating = rating;

        updateComment.onload = function () {
          fetchComments();
        };
        updateComment.send(JSON.stringify(comment_array[j]));
        console.log(comment_array);
      }
    }
    else {
      alert("you can only edit your own comments")
    }
  }
}

*/
