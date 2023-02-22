
//search function
function searchMe() {
  restaurant_name = document.getElementById("search")
  console.log(restaurant_name);
  restaurant_name.addEventListener("keyup", (e) => {
    search_value = restaurant_name.value;
    var search = new XMLHttpRequest();
    restaurant_url = "/searchRestaurants/" + search_value;
    search.open('GET', restaurant_url, true)
    search.setRequestHeader("Content-type", "application/json")
    search.onload = function () {
      restaurant_array = JSON.parse(search.responseText);
      console.log(restaurant_array);
      displayRestaurant();

    }
    var payload = { search: search_value }
    if (payload = "") {
      search.send(JSON.stringify(payload));

    }
    else {
      getRestaurantData()
    }
  })
}
//refreshes the page to revert back t how it was when there was no search input
function clearSearch() {
  window.location.replace("http://127.0.0.4:8080/index.html");
}

//not being used
function displaySearchInIndex() {
  var link = window.location.href;
  if (link.includes("index.html")) {
    document.getElementById("index1").style.display = "none";
    //document.getElementById("search_index").style.display = "block";
    //document.getElementById("index2").style.display = "block";
    searchMe()
  }
}




//function to call the restaurant api and get all the restaurants that has a restaurant id
function getRestaurantData() {
  var request = new XMLHttpRequest();
  request.open('GET', restaurant_url, true);
  //this function is called when data returns from web api
  request.onload = function () {
    //get all resturant records into restaurant array
    restaurant_array = JSON.parse(request.responseText)
    console.log(restaurant_array) //output to console
    //call the function so as to display all restaurant names
    displayRestaurant();
  };
  //this command starts the calling of the restaurants web api
  request.send();
}


//main function that display the restaurants
function displayRestaurant() {

  var table = document.getElementById("index2");
  table.classList.add("row");
  var restaurantCount = 0;
  var message = "";
  //debugger;

  table.innerHTML = "";
  totalRestaurants = restaurant_array.length;
  for (var count = 0; count < totalRestaurants; count++) {
    if (restaurant_array[count].restaurant_id != 0) { //just need something to compare it to
      var thumbnail = restaurant_array[count].restaurant_logo;
      //console.log(restaurant_logo);
      var title = restaurant_array[count].restaurant_name;
      var restaurant_id = restaurant_array[count].restaurant_id;
      var cell = '<div class="card col-md-3 mt-4 py-3 " ><img class="card-img-top" src="' + thumbnail + '" alt="Card image cap">\<div class="card-body"><i class="far fa-comment fa-lg" style="float:left;cursor:pointer" data-toggle="modal" data-target = "#commentModal" item = "' + restaurant_id + '" onClick = "showRestaurantComments(this)" ></i >\<h5 style="padding-left:30px;cursor:pointer" data-toggle="modal" data-target="#restaurantsModal" class="card-title" item="' + restaurant_id + '" onClick="showRestaurantDetails(this)">' + title + '</h5></div >\ </div >'

      table.insertAdjacentHTML('beforeend', cell);
      restaurantCount++;
      //debugger;
    }
  }
  message = restaurantCount + " Restaurants available";
  document.getElementById("summary_index2").textContent = message;
  document.getElementById("summary_index2").style.fontSize = "x-large"; //styling increase font size

}


//if the link has index.html then it hides 'index1' & 'search_index' div
function changeDiv2AllRes() {
  var link = window.location.href;
  if (link.includes("index.html")) {
    document.getElementById("search_index").style.display = "none";
    document.getElementById("index1").style.display = "none";


    //document.getElementById("index2").style.display = "block";
    //document.getElementsByClassName("toggle-home").textContent="";
    getRestaurantData()
  }
}


//this function displays individual restaurant details whenever user clicks on restaurant name
function showRestaurantDetails(element) {
  var item = element.getAttribute("item");
  //currentIndex = item;
  for (var i = 0; i < restaurant_array.length; i++) {
    if (restaurant_array[i].restaurant_id == item) {
      document.getElementById("restaurantTitle").textContent = restaurant_array[i].restaurant_name;
      document.getElementById("restaurantLogo").src = restaurant_array[i].bigger_restaurant_logo;
      document.getElementById("cuisine").textContent = restaurant_array[i].category_name;
      document.getElementById("priceRange").textContent = restaurant_array[i].price_range;
      document.getElementById("telephoneNumber").textContent = restaurant_array[i].telephone_number;
      document.getElementById("location").textContent = restaurant_array[i].location;
      document.getElementById("address").textContent = restaurant_array[i].address;
    }
  }

}

//this function opens a new window/tab and loads the particular restaurant link
function redirectWebsite() {
  window.open(restaurant_array[currentIndex].website_link, "_blank");
}


/*
function searchMe() {
  restaurant_name = document.getElementById("search").value;
  restaurant_array = [];
  pattern = new RegExp("No restaurant yet");
  restaurant_url = "/searchRestaurants/" + restaurant_name;
  var request = new XMLHttpRequest();
  request.open('GET', restaurant_url, true);
  request.onload = function () {
    restaurant_array = JSON.parse(request.responseText);
    console.log(restaurant_array);
    pattern = new RegExp(restaurant_name, "i"); // "g" for global, "i" for case-insensitive
    displayRestaurant();
  };
  request.send();
}
*/

// //this function displays individual restaurant details whenever user clicks on restaurant name
// function showRestaurantDetails(element) {
//   var item = element.getAttribute("item");
//   currentIndex = item;
//   document.getElementById("restaurantTitle").textContent = restaurant_array[item].restaurant_name;
//   document.getElementById("restaurantLogo").src = restaurant_array[item].bigger_restaurant_logo;
//   document.getElementById("cuisine").textContent = restaurant_array[item].category_name;
//   document.getElementById("priceRange").textContent = restaurant_array[item].price_range;
//   document.getElementById("telephoneNumber").textContent = restaurant_array[item].telephone_number;
//   document.getElementById("location").textContent = restaurant_array[item].location;
//   document.getElementById("address").textContent = restaurant_array[item].address;
// }

// //this function opens a new window/tab and loads the particular restaurant link
// function redirectWebsite() {
//   window.open(restaurant_array[currentIndex].website_link, "_blank");
// }



