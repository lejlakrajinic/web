var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); 
var config = require('./config'); 

var user = require('./routes/user.js');
var hotel = require('./routes/hotel.js');
var restaurant = require('./routes/restaurants.js');
var comment = require('./routes/comments.js');
var blog = require('./routes/blogs.js');

var port = process.env.PORT || config.serverport;

mongoose.connect(config.database, function(err){
	if(err){
		console.log('Error connecting database, please check if MongoDB is running.');
	}else{
		console.log('Connected to database...');
	}
}); 

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('body-parser').json({ type : '*/*' }));

app.use('/',express.static(__dirname + '/public'))//will use as root and will redirect to index.html
app.use(express.static('images'))




// express router
var apiRoutes = express.Router();

app.use('/api', apiRoutes);

//simple login
apiRoutes.post('/login', user.login);
apiRoutes.post('/signup', user.signup);

apiRoutes.use(user.authenticate); // route middleware to authenticate and check token

// authenticated routes
apiRoutes.get('/', function(req, res) {
	res.status(201).json({ message: 'Welcome to the authenticated routes!' });
});

apiRoutes.get('/user/:id', user.getuserDetails); // API returns user details 

apiRoutes.put('/user/:id', user.updateUser); // API updates user details

apiRoutes.put('/password/:id', user.updatePassword); // API updates user password

// API adds & update hotel
apiRoutes.put('/hotels/:id', hotel.savehotel);
apiRoutes.post('/hotels', hotel.savehotel); 
//API removes the hotel details of given hotel id
apiRoutes.delete('/hotels/:id', hotel.delhotel);
// API returns hotel details of given hotel id
apiRoutes.get('/hotels/:id', hotel.gethotel);
//API return all hotels
apiRoutes.get('/hotels', hotel.gethotels); 

// API adds & update restaurant
apiRoutes.post('/restaurants', restaurant.saverestaurant);
apiRoutes.post('/restaurants/:id', restaurant.saverestaurant);

apiRoutes.delete('/restaurants/:id', restaurant.delrestaurant); //API removes the restaurant details of given restaurant id
apiRoutes.get('/restaurants/:id', restaurant.getrestaurant); // API returns restaurant details of given restaurant id
apiRoutes.get('/restaurants', restaurant.getrestaurants); //API return all hotels

apiRoutes.post('/comments/:id', comment.savecomment);
apiRoutes.post('/comments', comment.savecomment); // API adds & update comment
apiRoutes.delete('/comments/:id', comment.delcomment); //API removes the comment details of given comment id
apiRoutes.get('/hotels/:hotelId/comments', comment.getcomments); //API return all hotel comments
apiRoutes.get('/restaurants/:restaurantId/comments', comment.getcomments); //API return all restaurant comments

apiRoutes.post('/blogs/:id', blog.saveblog); 
apiRoutes.post('/blogs', blog.saveblog); // API adds & update blog
apiRoutes.delete('/blogs/:id', blog.delblog); //API removes the blog details of given blog id
apiRoutes.get('/blogs', blog.getblogs); 

// start
app.listen(port);
console.log('listening at http://localhost:' + port);
