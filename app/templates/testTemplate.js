var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('<%= resourceUpper %>', function() {
	var url = 'http://localhost:5000<%= baseRoute %><%= resource %>';
	var validRecord = {'name': 'My <%= resource %>!', 'description': 'I created it!'};
	var validUpdate = {'name': 'A cooler <%= resource %> name', 'description': 'A better description'};
	var invalidRecord = {'name': null};



	describe('Create', function() {
		it('Should return the new <%= resource %> if created successfully', function(done) {
			request(url).post('/')
						.send(validRecord)
						.expect(200)
						.end(function(err, res) {
							if(err) throw err;

							res.body.should.have.property('name');
							res.body.should.have.property('description');

							done();
						});
		});
		it('Should provide an error if invalid data', function(done) {
			request(url).post('/')
						.send(invalidRecord)
						.expect(500)
						.end(function(err, res) {
							if(err) throw err;

							res.body.should.have.property('message');
							done();
						});
		});
	});

	describe('List', function() {
		it('Should provide a list of <%= resource %>s', function(done) {			
			request(url).get('/')
				.expect(200)
				.end(function(err, res) {
					if(err) throw err;
	
					var recordCount = res.text.length;
					recordCount.should.be.type('number');

					done();
				});
		});

		it('Should have the appropriate fields', function(done) {
			request(url).get('/')
				.expect(200)
				.end(function(err, res) {
					if(err) throw err;

					res.body[0].should.have.property('name');
					res.body[0].should.have.property('description');

					done();
				});
		});
	});

	describe('Details', function() {
		it('Should provide a single <%= resource %>', function(done) {
			request(url).get('/1')
				.expect(200)
				.end(function(err, res) {
					if(err) throw err;

					res.body.should.have.property('name');
					res.body.should.have.property('description');

					done();
				});
		});
		it('Should provide an error if no <%= resource %> is found', function(done) {
			request(url).get('/99')
						.expect(404)
						.end(function(err, res) {
							if(err) throw err;

							res.body.should.have.property('message');
							res.body.message.should.equal('<%= resourceUpper %> not found');

							done();
						});
		});
	});

	describe('Update', function() {		
		it('Should return the updated user if saved successfully', function(done) {
			request(url).put('/1')
						.send(validUpdate)
						.expect(200)
						.end(function(err, res) {
							if(err) throw err;

							res.body.should.have.property('name');
							res.body.should.have.property('description');
							res.body.name.should.equal(validUpdate.name);
							res.body.description.should.equal(validUpdate.description);

							done();
						});
		});
		it('Should provide an error if unable to save', function(done) {
			// Figure out how it will decide if it can't save...
			var fake = false;
			fake.should.be.false;
			done();
		});
		it('Should provide an error if invalid data', function(done) {
			request(url).put('/1')
						.send(invalidRecord)
						.expect(500)
						.end(function(err, res) {
							if(err) throw err;

							res.body.should.have.property('message');
							done();
						})
		});
		it('Should provide an error if user cannot be found', function(done) {
			request(url).put('/99')
						.send(validUpdate)
						.expect(404)
						.end(function(err, res) {
							if(err) throw err;

							res.body.should.have.property('message');
							done();
						});
		});
	});

	describe('Delete', function() {
		it('Should return successfully if deleted', function(done) {
			request(url).del('/1')
						.expect(200)
						.end(function(err, res) {
							if(err) {
								throw err;
							};
							done();
						});
		});
		it('Should return an error if <%= resource %> cannot be deleted', function(done) {
			var fake = false;
			fake.should.be.false;
			done();
		})
		it('Should return an error if <%= resource %> not found', function(done) {
			request(url).del('/99')
						.expect(404)
						.end(function(err, res) {
							if(err) throw err;

							res.body.should.have.property('message');
							done();
						});
		});
	});
});