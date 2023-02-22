
//if-else condtition to see if the page is opening from index.html or all-restaurants.html
function displayCategoryByHTML(category) {
  var link = window.location.href;
  if (link.includes("all-restaurants.html")) {
    var table = document.getElementById("restaurantsTable");
    var restaurantCount = 0;
    var message = "";

    //debugger;

    table.innerHTML = "";
    totalRestaurants = restaurant_array.length;
    //if (restaurant_array[count].category_name == category) {

    for (var count = 0; count < totalRestaurants; count++) {
      if (restaurant_array[count].category_name == category) { //just need something to compare it to
        var thumbnail = restaurant_array[count].restaurant_logo;
        //console.log(restaurant_logo);
        var title = restaurant_array[count].restaurant_name;
        var cell = '<div class="card col-md-3 mt-4 py-3 " ><img class="card-img-top" src="' + thumbnail + '" alt="Card image cap">\<div class="card-body"><i class="far fa-comment fa-lg" style="float:left;cursor:pointer" data-toggle="modal" data-target = "#commentModal" item = "' + count + '" onClick = "showRestaurantComments(this)" ></i >\<h5 style="padding-left:30px;cursor:pointer" data-toggle="modal" data-target="#restaurantsModal" class="card-title" item="' + count + '" onClick="showRestaurantDetails(this)">' + title + '</h5></div >\ </div >'

        table.insertAdjacentHTML('beforeend', cell);
        restaurantCount++;
        //debugger;
      }
    }
    message = restaurantCount + " Restaurants available";
    document.getElementById("summary").textContent = message;
    //document.getElementById("parent").textContent = "";

  }
  /*
  else if (link.includes("index.html")) {
    document.getElementById("index1").style.display = "none";
    document.getElementById("search_index").style.display = "none"; */
  else if (link.includes("index.html")) {
    document.getElementById("index1").style.display = "none";
    document.getElementById("search_index").style.display = "none";
  }

  //document.getElementById("index2").style.display = "block";
  getRestaurantByCategoryName(category);
}



//get category data and append to restaurant array
function getRestaurantByCategoryName(category) {
  var request = new XMLHttpRequest();
  var restaurant_url = "/restaurants/" + category;
  request.open('GET', restaurant_url, true);
  request.setRequestHeader("Content-type", "application/json")
  //this function is called when data returns from web api
  request.onload = function () {
    //get all resturant records into restaurant array
    var restaurantData = JSON.parse(request.responseText)
    console.log(restaurantData) //output to console
    displayRestaurantBasedByCategory(restaurantData);
    //call the function so as to display all restaurant names
  }
  request.send();
}


//display restaurants based on the data from the restaurant array with the categories
function displayRestaurantBasedByCategory(restaurantData) {
  //change table to a relevant element name
  //dynamically style restaurants to rows instead of class="row"
  var table = document.getElementById("index2");
  table.classList.add("row");
  var restaurantCount = 0;
  var message = "";

  //debugger;

  table.innerHTML = "";
  totalRestaurants = restaurantData.length;
  for (var count = 0; count < totalRestaurants; count++) {
    if (restaurantData[count].restaurant_id != 0) { //just need something to compare it to
      var thumbnail = restaurantData[count].restaurant_logo;
      //console.log(restaurant_logo);
      var title = restaurantData[count].restaurant_name;
      var restaurant_id = restaurantData[count].restaurant_id;

      var cell = '<div class="card col-md-3 mt-4 py-3 " ><img class="card-img-top" src="' + thumbnail + '" alt="Card image cap">\<div class="card-body"><i class="far fa-comment fa-lg" style="float:left;cursor:pointer" data-toggle="modal" data-target = "#commentModal" item = "' + restaurant_id + '" onClick = "showRestaurantComments(this)" ></i >\<h5 style="padding-left:30px;cursor:pointer" data-toggle="modal" data-target="#restaurantsModal" class="card-title" item="' + restaurant_id + '" onClick="showRestaurantDetails(this)">' + title + '</h5></div >\ </div >'

      table.insertAdjacentHTML('beforeend', cell);
      restaurantCount++;
      //debugger;
    }
  }
  message = restaurantCount + " Restaurants available";
  document.getElementById("summary_index2").textContent = message;
  document.getElementById("summary_index2").style.fontSize = "x-large"; //styling increase font size

  //document.getElementById("parent").textContent = "";
}


//function to assign the respective category 
function showWesternCuisine() {
  category = "Western";
  displayCategoryByHTML(category);

}

function showIndianCuisine() {
  category = "Indian";
  displayCategoryByHTML(category);
}

function showHalalCuisine() {
  category = "Halal";
  displayCategoryByHTML(category);
}

function showFastFoodCuisine() {
  category = "Fast Food";
  displayCategoryByHTML(category);
}

function showJapaneseCuisine() {
  category = "Japanese";
  displayCategoryByHTML(category);
}

function showDrinksCuisine() {
  category = "Drinks";
  displayCategoryByHTML(category);
}

function showVegetarianCuisine() {
  category = "Vegetarian";
  displayCategoryByHTML(category);
}
