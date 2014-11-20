var express = require('express'),
	router = express.Router(),
	User = require('./models/user'),
	Auth = require('./lib/auth');


module.exports = (function(){

	router.post('/auth/signup', function(req, res, next){
		var user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});

		user.save(function(err, user){
			if(err){
				return next(err);
			}

			res.status(200).send(user);
		});
	});

	router.post('/auth/login', function(req, res){
		console.log('login request');

		User.findOne({ email: req.body.email}, function(err, user){
			if (err) { 
				res.status(501).send(err);
			}

			if (!user){
		        return res.status(401).send('user does not exist');
      		}


      		user.comparePassword(req.body.password, function(err, isMatch){
      			if (!isMatch){
      				return res.status(401).send('invalid email/password combination');
      			}

      			var token = Auth.createJwtToken(user);
      			res.status(200).send({token: token});
      		})
		})
	})

	router.get('*', function(req, res){
		res.sendFile(__dirname + '/public/index.html');
	})

	return router;
})();