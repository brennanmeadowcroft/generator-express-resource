module.exports = function(app, models) {
	var <%= resource %>BaseRoute = '<%= baseRoute %><%= resource %>/';

	app.get(<%= resource %>BaseRoute, function(req, res) {
		models.<%= resourceUpper %>.findAll()
					.then(function(<%= resource %>s) {
						res.header("Content-Type", "application/json");
						res.status(200);
						res.end(JSON.stringify(<%= resource %>s));
					});
	});

	app.get(<%= resource %>BaseRoute + ':<%= resource %>Id', function(req, res) {
		res.header("Content-Type", "application/json");

		models.<%= resourceUpper %>.find({
			where: { id: req.params.<%= resource %>Id }
		}).then(function(<%= resource %>) {
			if(<%= resource %>) {
				res.status(200);
				res.end(JSON.stringify(<%= resource %>));
			}
			else {
				res.status(404);
				res.end(JSON.stringify({'message': '<%= resourceUpper %> not found'}));
			}
		});
	});

	app.post(<%= resource %>BaseRoute, function(req, res) {
		res.header("Content-Type", "application/json");

		models.<%= resourceUpper %>.create(req.body)
					.then(function(<%= resource %>) {
						res.status(200);
						res.end(JSON.stringify(<%= resource %>));
					})
					.catch(function(err) {
						res.status(500);
						res.end(JSON.stringify({ 'message': err }));
					});
	});

	app.put(<%= resource %>BaseRoute + ':<%= resource %>Id', function(req, res) {
		res.header("Content-Type", "application/json");
		
		models.<%= resourceUpper %>.find({
			where: { id: req.params.<%= resource %>Id }
		}).then(function(<%= resource %>) {
			if(<%= resource %>) {
				<%= resource %>.update(req.body)
					.then(function(l) {
						res.status(200);
						res.end(JSON.stringify(l));
					})
					.catch(function(err) {
						res.status(500);
						res.end(JSON.stringify({ 'message': err }));
					});
			}
			else {
				res.status(404);
				res.end(JSON.stringify({ 'message': '<%= resourceUpper %> not found' }));
			}
		});
	});

	app.delete(<%= resource %>BaseRoute + ':<%= resource %>Id', function(req, res) {
		models.<%= resourceUpper %>.find({
    		where: { id: req.params.<%= resource %>Id }
		}).then(function(<%= resource %>) {
			if(<%= resource %>) {
				<%= resource %>.destroy().then(function() {
					res.status(200);
					res.header("Content-Type", "application/json");
					res.end(JSON.stringify({ 'message': '<%= resourceUpper %> Deleted' }));
				});
			}
			else {
				res.status(404);
				res.header("Content-Type", "application/json");
				res.end(JSON.stringify({ 'message': '<%= resourceUpper %> not found' }));
			}
		});
	});
};

