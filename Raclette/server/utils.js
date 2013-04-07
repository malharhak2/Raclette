define([], function () {
	
	var utils = {};
	utils.randomString = function (len, cas){
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

	return utils;
});