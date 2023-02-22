//logout function
function logoutMe() {
  $('#registerMenu').show();
  $('#loginMenu').show();
  $('#logoutMenu').hide();
  $('#profileMenu').hide();
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user_id");

  //remove session storage
  sessionStorage.removeItem("token");
  if (window.location = "profile.html") {
    window.location.href = "index.html";
  }
  else {
    null
  }


}










// function logoutMe() {
//   var logOut = window.confirm("Are you sure you want to log out?")

//   if (logOut) {
//     $('#registerMenu').show();
//     $('#loginMenu').show();
//     $('#logoutMenu').hide();
//     $('#profileMenu').hide();
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("user_id");

//     //remove session storage

//     sessionStorage.removeItem("token");
//     if (window.location = "profile.html") {
//       window.location.href = "index.html";
//     }
//     else {
//       null
//     }

//   }
// }