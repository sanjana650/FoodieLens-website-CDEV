var express = require("express");

//set restuarantController to the restaurantController class
var restaurantController = require('./controllers/restaurantController');
var commentController = require('./controllers/commentController');
var userController = require('./controllers/userController');


//set variable app to be an instance of express framework. app is now the express
var app = express();

app.use(express.static("./public"));
app.use(express.json());

//restaurants
app.route('/restaurants').get(restaurantController.getAllRestaurants);
app.route('/restaurants/:id').get(restaurantController.getRestaurantByCategory);
app.route('/searchRestaurants/:id').get(restaurantController.searchRestaurants);
//app.route('/restaurants/:category_name').get(restaurantController.getRestaurantByCategoryName);


//reviews
app.route('/comments').get(commentController.getAllComments);
app.route('/comments').post(commentController.addComment);
app.route('/comments/:id').put(commentController.updateComment);
app.route('/comments/:id').delete(commentController.deleteComment);
app.route('/comments/:id').get(commentController.getCommentById);



//routes for users
app.route('/users').get(userController.getAllUsers);
app.route('/users').post(userController.addUser);
app.route('/users').put(userController.updateUser);
app.route('/users/:id').delete(userController.updateUser);
app.route('/login').post(userController.loginUser);
app.route('/userProfile').post(userController.getUser);





app.listen(8080, "127.0.0.4");
console.log("web server running @ http://127.0.0.4:8080");
