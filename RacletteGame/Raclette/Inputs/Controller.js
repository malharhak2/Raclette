define (["rDebug", "rCONFIG", "rutils", "rControllerKey"], 
function (debug, config, utils, ControllerKey) {
	var Controller = function (args) {
		this.id = args.id;
		this.keysTable = args.keysTable;
		this.active = true;
		this.init();
	};

	Controller.prototype.init = function () {
		this.keys = {};
		for (var i in this.keysTable) {
			this.keys[i] = new ControllerKey({
				name : i,
				touches : this.keysTable[i]
			});
		};
	};

	Controller.prototype.getKey = function (key) {
		return this.keys[key].pressed;
	};

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

	return Controller;
});