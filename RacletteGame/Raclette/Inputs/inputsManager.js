define(["jquery", "rDebug", "rutils", "rCONFIG", "rGamepad", "rController", "rCanvasManager"], 
function ($, debug, utils, config, gamepad, Controller, canvasManager) {

	var InputsManager = function(){
		this.controllers = [];
		this.keysTable = config.keysTable;
		this.init();
	};

	InputsManager.prototype.init = function(correspondances){
		for (var i = 0; i < config.controllers.length; i++) {
			var c = config.controllers[i];
			this.controllers.push(new Controller(c));
		};
		var that = this;
		debug.log (canvasManager.canvas);
		$('body').keydown( function (event) {
			debug.log("Inputs manager", "keydown", event.keyCode);
			that.keydown(event.keyCode);
		});
		$('body').keyup (function (event) {
			that.keyup(event.keyCode);
		});
	};

	InputsManager.prototype.keydown = function (keycode) {
		for (var i = 0; i < this.controllers.length; i++) {
			this.controllers[i].keydown(keycode);
		};
	};
	InputsManager.prototype.keyup = function (keycode) {
		for (var i = 0; i < this.controllers.length; i++) {
			this.controllers[i].keyup (keycode);
		};
	};

	InputsManager.prototype.getKey = function(id, button){
		var controller = this.controllers[id];
		var touch = button;
		if (arguments.length == 1) {
			controller = this.controllers[0];
			touch = [id];
		}
		if (controller.getKey(touch)) {
			return true;
		}
		return false;
	};

	return new InputsManager();
});