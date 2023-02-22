//log in function
function loginMe() {

  var loginUser = new XMLHttpRequest();
  loginUser.open("POST", "http://127.0.0.4:8080/login", true);
  loginUser.setRequestHeader("Content-Type", "application/json");
  loginUser.onload = function () {
    $('#loginModal').modal('hide');

    var token = JSON.parse(loginUser.responseText);

    curr_user_id = token.user_id;
    email = token.email;
    console.log(token.result, token.user_id);
    if (token.result != "invalid") {
      $('#successModal').modal('show');
      document.getElementById("registerMenu").style.display = "none";
      document.getElementById("loginMenu").style.display = "none";
      document.getElementById("logoutMenu").style.display = "block";
      document.getElementById("profileMenu").style.display = "block";
      sessionStorage.setItem("token", token.result);
      //sessionStorage.setItem("nickname", token.username);

      sessionStorage.setItem("user_id", curr_user_id);
      sessionStorage.setItem("username", token.username);
      sessionStorage.setItem("email", token.email);
    }

    //sessionStorage.setItem("restaurant_id", token.restaurant_id)

    //console.log(sessionStorage.setItem("restaurant_id", token.restaurant_id))


    else {
      $('#failModal').modal('show');
    }
  }

  var username = document.getElementById("usernameLogin").value;
  var password = document.getElementById("passwordLogin").value;

  var payload = { username: username, password: password }
  loginUser.send(JSON.stringify(payload));

}