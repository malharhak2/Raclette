define (["rDebug", "rCONFIG", "rutils"], 
function (debug, config, utils) {
	var ControllerKey = function (args) {
		this.name = args.id;
		this.touches = args.touches;
		this.pressed = false;
	};

	ControllerKey.prototype.getKeys = function () {
		return this.touches;
	}

	ControllerKey.prototype.press = function () {
		this.pressed = true;
	};

	ControllerKey.prototype.keydown = function (keycode) {
		for (var i = 0; i < this.touches.length; i++) {
			if (keycode == this.touches[i]) {
				this.pressed = true;
			}
		};
	};

	ControllerKey.prototype.keyup = function (keycode) {
		var found = false;
		for (var i = 0; i < this.touches.length; i++) {
			if (keycode == this.touches[i]) {
				this.pressed = false;
			}
		};
	};

	return ControllerKey;
});