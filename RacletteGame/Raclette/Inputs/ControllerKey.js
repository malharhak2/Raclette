define (["rDebug", "rCONFIG", "rutils", "rGamepads"], 
function (debug, config, utils, gamepads) {
	var ControllerKey = function (args) {
		this.name = args.id;
		this.touches = args.touches;
		this.gamepadNb = args.gamepadNb;
		this.analog = 0;
		this.keyboard = 0;
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
			if (typeof this.touches[i] == "number") {
				if (keycode == this.touches[i]) {
					this.pressed = true;
					this.keyboard = 1;
				}
			}
		};
	};

	ControllerKey.prototype.isPressed = function () {
		if (this.analog > config.pressedThreshold || this.keyboard ) {
			return true;
		} else {
			return false;
		}
	};

	ControllerKey.prototype.isDetected = function () {
		if (this.analog > config.detectThreshold || this.keyboard) {
			return true;
		} else {
			return false;
		}
	}

	ControllerKey.prototype.GetValue = function () {
		if (this.analog > this.keyboard) return this.analog;
		else return this.keyboard;
	};

	ControllerKey.prototype.keyup = function (keycode) {
		var found = false;
		for (var i = 0; i < this.touches.length; i++) {
			if (typeof this.touches[i] == "number") {
				if (keycode == this.touches[i]) {
					this.pressed = false;
					this.keyboard = 0;
				}
			}
		};
	};

	ControllerKey.prototype.update = function () {
		for (var i = 0; i < this.touches.length; i++) {
			if (typeof this.touches[i] == "string") {
				var value = gamepads.getKey(this.gamepadNb, this.touches[i]);
					this.analog = value;
			}
		}
	}

	return ControllerKey;
});