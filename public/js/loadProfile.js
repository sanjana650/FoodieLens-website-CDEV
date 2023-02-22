

//to display profile info
function loadProfileInfo() {
  document.getElementById("usernameProfile").value = sessionStorage.getItem("username");

  document.getElementById("emailProfile").value = sessionStorage.getItem("email");

}




// $(document).ready(function () {
//   document.getElementById("username").value = sessionStorage.getItem("username");

//   document.getElementById("email").value = sessionStorage.getItem("email");
// });