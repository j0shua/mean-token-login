var jwt = require('jwt-simple'),
	moment = require('moment'),
	tokenSecret = 'omgwtfbbq';

module.exports = {
	ensureAuthenticated: function(req, res, next){

		if (req.headers.authorization) {
	     	var token = req.headers.authorization.split(' ')[1];
	     	try {
	        	var decoded = jwt.decode(token, tokenSecret);
	        	if (decoded.exp <= Date.now()) {
	          		res.send(400, 'Access token has expired');
	        	} else {
	          		req.user = decoded.user;
	          		return next();
	        	}
	      	} catch (err) {
	        	return res.send(500, 'Error parsing token');
	      	}
	    } else {
	      return res.send(401);
	    }
	},


	createJwtToken: function(user){
		var payload = {
			user: user,
			iat: (+new Date()),
			exp: moment().add(7, 'days').valueOf()
		};

		return jwt.encode(payload, tokenSecret);
	}
};