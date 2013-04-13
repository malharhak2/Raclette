define (["rDebug", "rutils", "rCONFIG"],
function (debug, utils, config) {
	
	var User = function () {

	};

	User.prototype.init = function (callback) {
		this.level = 0;
		callback();
	};

	return new User();
});