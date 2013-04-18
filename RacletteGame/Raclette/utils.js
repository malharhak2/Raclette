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

	Utils.prototype.randomString = function (len, cas){
		var alphabet = "abcdefghijklmnopqrstuvwxyz";
		var tokenLength = 25;
		if (len)
			tokenLength  = len;
		var token = "";
		for (var i = 0; i < tokenLength; i++){
			var letter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
			if (Math.random() > 0.5)
				letter = letter.toUpperCase();
			if (cas !== undefined) {
				if (cas == "up")
					letter = letter.toUpperCase();
				else
					letter = letter.toLowerCase();
			}
			token += letter;
		}
		return token;
	};

	Utils.prototype.toChar = function(nombre){
		var retour = "";
		if (nombre <= 9){
			retour = "0"+nombre;
		}else{
			retour += nombre;
		}
		return retour;
	}
	
	return new Utils();
});