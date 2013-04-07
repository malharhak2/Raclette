var assert = require('assert');
var should = require('should');
var requirejs = require('requirejs');
var mongoose = require('mongoose');
requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require,
    baseUrl : __dirname + "/.."
});

describe('App', function () {

	it ('should have an environment set', function(done) {
		requirejs(['CONFIG'], function (CONFIG) {

			var express = require('express'),
				app     = express(),
				port    = CONFIG.port;


			CONFIG.init(app.settings.env);
			CONFIG.should.have.property('environment', app.settings.env);
			done();
		});
	});
});
describe('User', function() {

	
  	it ('should exist if fid is "test123"', function (done) {
		mongoose.connect('mongodb://localhost/folks', function (err) {

	  		requirejs(['mongo/User/User'], function (User) {
	  			var user = new User({
	  				auth : {
	  					facebook : {
	  						fid : "test123"
	  					}
	  				}
	  			});
	  			user.doesExist(function (answer) {
	  				answer.should.be.ok;
	  				done();
	  			});
	  		});
		});
  	});

  	it ('should not exist if id is "anonymousdu93rpz"', function (done) {

   		requirejs(['mongo/User/User'], function (User) {
  			var user = new User({
  				auth : {
  					facebook : {
  						fid : "anonymousdu93rpz"
  					}
  				}
  			});
  			user.doesExist(function (answer) {
  				answer.should.not.be.ok;
  				done();
  			});
  		});

  	});

  	it ('should have a map when we get it', function (done) {
   		
   		requirejs(['mongo/User/User'], function (User) {
  			var user = new User({
  				auth : {
  					facebook : {
  						fid : "test123"
  					}
  				}
  			});
  			user.init(function (resp) {

				user.model.should.have.property('map');
				done();
  			})
  		});
  	});
});







/* Exemples */
describe('nextPrime', function() {
  	it('should return the next prime number', function() {
  		requirejs(['prime'], function (prime) {
			assert.equal(11, prime.nextPrime(7));
  		});
  	});
});
describe('asyncPrime', function() {
	it('should return the next prime number', function(done) {

		requirejs(['prime'], function (prime) {
		    	prime.asyncPrime(128, function(n) {
	    		assert.equal(131, n, 'Wrong number');
	    		done();
	    	});
		});
  	});
});