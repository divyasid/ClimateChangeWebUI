var express = require('express');
var router = express.Router();
var path = require('path');
var ctrlLogin = require("../controllers/login");

//we can take either approach, you can comment the PUG code and open HTML or vice versa 

//Approach 1 : home page with HTML
//router.post('/', ctrlLogin.post_login);


//Approach 2 : home page with PUG
/*
router.post('/', function(req, res, next) {
	res.render('homeP', { title1: 'Hello vanu' });
});
*/

/*router.post('/', function(req, res, next) {
	res.render('homePage');
});*/


router.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/../public/html/homepage.html'));
});

router.post('/', function(req, res){
	
	var userName = req.body.user;
	var password = req.body.password;

	console.log("User exists? " + userMap.has(userName));
	console.log("Password: " + userMap.get(userName));
	console.log("Password matches?: " + (password == userMap.get(userName)));
	
	if (userMap.has(userName) && password == userMap.get(userName)) {
		res.redirect('/home');
	}
	res.redirect('/login');
});


module.exports = router;
