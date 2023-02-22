//resgister new user
function registerMe() {
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;


  if (username == "" || email == "" || password == "") {
    alert("Ensure all fields are filled up!")
    return;
  }

  else if (username.length > 10) {
    alert("Your username cannot be more than 15 characters! ");
    return;
  }

  else if (password.length > 1 && password.length < 4) {
    alert("Your password cannot be less than 4 characters! ");
    return;
  }
  else if (password != confirmPassword) {
    alert("Please make sure your passwords match ");
    return;
  }


  else {
    var registerUser = new XMLHttpRequest();
    registerUser.open("POST", "http://127.0.0.4:8080/users", true);
    registerUser.setRequestHeader("Content-Type", "application/json");
    registerUser.onload = function () {
      $('#registerModal').modal('hide');
      $('#successModal').modal('show');

    }

    var payload = { username: username, email: email, password: password }
    registerUser.send(JSON.stringify(payload));

  }

}