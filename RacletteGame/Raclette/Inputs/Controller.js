define (["rDebug", "rCONFIG", "rutils", "rControllerKey"], 
function (debug, config, utils, ControllerKey) {
	var Controller = function (args) {
		this.id = args.id;
		this.gamepadNb = args.gamepadNumber;
		this.keysTable = args.keysTable;
		this.active = true;
		this.init();
	};

	Controller.prototype.init = function () {
		this.keys = {};
		for (var i in this.keysTable) {
			this.keys[i] = new ControllerKey({
				name : i,
				touches : this.keysTable[i],
				gamepadNb : this.gamepadNb
			});
		};
	};

	Controller.prototype.getKey = function (key) {
		return this.keys[key].GetValue();
	};

	Controller.prototype.isPressed = function (key) {
		return this.keys[key].isPressed();
	}

	Controller.prototype.pressKey = function (key) {
		this.keys[key].press();
	}

	Controller.prototype.keydown = function (keycode) {
		for (var i in this.keys) {
			this.keys[i].keydown (keycode);
		}
	}

	Controller.prototype.keyup = function (keycode) {
		for (var i in this.keys) {
			this.keys[i].keyup (keycode);
		}
	}

	Controller.prototype.update = function () {
		for (var i in this.keys) {
			this.keys[i].update();
		}
	}

	return Controller;
});