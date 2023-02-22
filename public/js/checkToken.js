//if user logged out, token is removed then the navbar is changed to the logged out state
$(document).ready(function () {

  var token = sessionStorage.getItem("token");
  //var username = sessionStorage.getItem("username")

  if (token != null) {
    $('#registerMenu').hide();
    $('#loginMenu').hide();
    $('#logoutMenu').show();
    $('#profileMenu').show();

  }

})