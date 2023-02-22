
function update() {
  var updateUser = new XMLHttpRequest();
  updateUser.open("PUT", "http://127.0.0.4:8080/users", true);
  updateUser.setRequestHeader("Content-Type", "application/json");



  updateUser.onload = function () {
    //$('#successModal').modal('show');
    //update email with session as well
    //sessionStorage.setItem("email", email)
    alert("Your profile has been updated!")
  }
  email = document.getElementById("emailProfile").value;
  //username = document.getElementById("usernameProfile").value;

  var payload = { token: token, email: email }
  console.log(JSON.stringify(payload));
  updateUser.send(JSON.stringify(payload));
  //logoutMe();

}

