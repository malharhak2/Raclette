define(["Raclette/keyboardManager", "Raclette/Gamepad", "Raclette/VirtualController"], function(keyboardManager, gamepad, VirtualController) {

	var InputsManager = function(){
		this.virtualControllers = [];
		this.correspondances = [];
		this.keyboardManager = keyboardManager;
		keyboardManager.init();
	};

	InputsManager.prototype.init = function(correspondances){
		this.correspondances = correspondances;
	};

	InputsManager.prototype.addVirtualController = function(tableau) {
		var controller = new VirtualController;
		for (var i=0; i<tableau.length; i++) {
			if (tableau[i] == "keyboard") {
				controller.keyboard = true;
			} else if (tableau[i] == "allGamepads"){
				controller.gamepads = true;
			} else {
				controller.gamepads.push(tableau[i]);
			}
		};
		this.virtualControllers.push(controller)
		return this.virtualControllers.length-1;
	};

	InputsManager.prototype.isButtonPressed = function(id, button){
		var virtualController = this.virtualControllers[id];
		if (virtualController.keyboard == true) {
			if (keyboardManager.touches[button] == true) {
				var correspondant = this.correspondances[button.toString()];
				if (correspondant.type == "axe" && correspondant.direction == "minus") return -1;
				if (button == 13) console.log("ENTREE")
				return true;
			}
		}
		if (virtualController.gamepads == true) {
			for (var i=0; i<gamepad.gamepads.length; i++) {
				if (this.checkGamePad(i, virtualController, button)) return this.checkGamePad(i, virtualController, button);
			};
		}
		if (virtualController.gamepads!= undefined && virtualController.gamepads.length >= 1) {
			for (var i=0; i<virtualController.gamepads.length; i++) {
				if (this.checkGamePad(virtualController.gamepads[i], virtualController, button)) return this.checkGamePad(virtualController.gamepads[i], virtualController, button);
			};
		}
	};

	InputsManager.prototype.checkGamePad = function(i, virtualController, button) {
		var correspondant = this.correspondances[button.toString()];
		if (correspondant == undefined) {console.error("Button not defined in the InputsManager Init")};
		if (correspondant.type == "button") {
			if (gamepad.gamepads[i].buttons[correspondant.button]) return true;
		}
		if (correspondant.type == "axe") {
			if (correspondant.direction == "plus") {
				if (gamepad.gamepads[i].axes[correspondant.axe] >= 0.4) {
					return gamepad.gamepads[i].axes[correspondant.axe];
				}
			}
			if (correspondant.direction == "minus") {
				if (gamepad.gamepads[i].axes[correspondant.axe] <= -0.4) {
					return gamepad.gamepads[i].axes[correspondant.axe];
				}
			}
		}
	};
	return InputsManager;
});