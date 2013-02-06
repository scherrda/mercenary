module.exports = function(app, db, logger) {
	app.post('/user', function(req, res) {
		if(req.body.city && req.body.username) {
			db.users.save(req.body);
		}
		res.cookie('rememberme', req.body, { maxAge: 900000, httpOnly: false });
		res.send(req.body, 201);
	});

	app.delete('/user', function(req, res) {
		res.clearCookie('rememberme');
		res.send({});
	});

	app.get('/user', function(req, res){
		if(req.cookies && req.cookies.rememberme)
			res.send(req.cookies.rememberme);
		else {
			res.statusCode = 401;
			res.send();
		}
	});
};

module.exports.get = function(req) {
	if(req.cookies && req.cookies.rememberme)
		return req.cookies.rememberme;
	else 
		return undefined;
}