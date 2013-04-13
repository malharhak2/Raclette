define (["rutils", "rCONFIG", "rDebug", "rGamepad"], 
function (utils, CONFIG, debug, gamepadSupport) {
	var Gamepads = function () {
		this.gamepadSupport = gamepadSupport;
		debug.log("Gamepads", gamepadSupport);
		this.keys = {
			"0" : 0,
			"A" : 0,
			"1" : 1,
			"B" : 1,
			"2" : 2,
			"3" : 3,
			"4" : 4,
			"5" : 5,
			"6" : 6,
			"7" : 7,
			"8" : 8,
			"9" : 9,
			"Start" : 9,
			"10" : 10,
			"11" : 11,
			"12" : 12,
			"13" : 13,
			"14" : 14,
			"15" : 15,
			"16" : 16,
			"ls_right" : ["ls_x", 1],
			"ls_left" : ["ls_x", -1],
			"ls_up" : ["ls_y" , -1],
			"ls_down" : ["ls_y" , 1],			
			"rs_right" : ["rs_x", 1],
			"rs_left" : ["rs_x", -1],
			"rs_up" : ["rs_y" , -1],
			"rs_down" : ["rs_y" , 1],
		};
		this.axis = {
			"ls_x" : 0,
			"ls_y" : 1,
			"rs_x" : 2,
			"rs_y" : 3
		};

	};

	Gamepads.prototype.getKey = function (id, touch) {
		if (gamepadSupport.gamepads[id] != undefined) {
			var gamepad = gamepadSupport.gamepads[id];
			var key = this.keys[touch];
			if (typeof key == "number") {
				return gamepad.buttons[key];
			} else {
				var stick = this.axis[key[0]];
				var mode = key[1];
				return gamepad.axes[stick] * mode;
			}
		} else {
			return false;
		}
	};
	return new Gamepads();
});