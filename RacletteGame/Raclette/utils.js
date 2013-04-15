define(["rCONFIG"], function(config) {
	var Utils = function () {

	};
	
	Utils.prototype.chances = function (nb) {
		if (Math.floor (Math.random () * nb) == 2) {
			return true;
		} else {
			return false;
		}
	};
	Utils.prototype.metters = function (pixels) {
		return pixels / (config.unitSize); // Convert pixel in metters
	}

	Utils.prototype.pixels = function (metters) {
		return metters * config.unitSize; // Convert metters in pixels
	}

	Utils.prototype.aabb = function (al, ar, at, ab, bl, br, bt, bb) {
		if (al < br && ar > bl && at < bb && ab > bt) {
			return true;
		} else {
			return false;
		}
	}
	return new Utils();
});