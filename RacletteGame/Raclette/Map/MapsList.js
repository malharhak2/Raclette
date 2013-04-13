define (["rDebug", "rCONFIG", "rutils"], 
function (debug, config, utils) {
	
	var MapsList = function () {
		this.maps = [];
		for (var i = 0 ; i < config.maps.length; i++) {
			this.maps.push(config.maps[i]);
		};
	};
});