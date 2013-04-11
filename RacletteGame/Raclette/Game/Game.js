define(["rDebug", "rAnimationManager", "rTilesManager", "rMapLoader", "rWorld", "rutils", "rGamepad", "game/Main", "rinputsManager", "rLoader", "rCamera", "rCanvasManager", "rInterfaceManager"], 
	function(debug, animationManager, tilesManager, mapLoader, World, utils, gamepad, Main, InputsManager, loader, Camera, canvasManager, interfaceManager) {
	function Game() {
		debug.log("Game", "Creating game...");
		this.world = World;
		gamepad.init();
		this.gamepads = gamepad.gamepads;
		this.width = canvasManager.canvasWidth;
		this.height = canvasManager.canvasHeight;
		this.camera = Camera;
		this.inputsManager = InputsManager;
		this.interfaceManager = interfaceManager; 
		this.utils = utils;
		this.loaded = false;
		mapLoader.loadMap("01", function (map) {
		});
		debug.log("Game", "Game created");
	};
	
	Game.prototype.render = function() {
		if (!this.loaded) {
			loader.render(canvasManager.ctx);
		} else {
			canvasManager.cleanCanvas();
			World.render();
			this.interfaceManager.renderBegin();
			this.interfaceManager.renderEnd();

		}
	};

	Game.prototype.logic = function() {
		if (!this.loaded) {
			if (loader.update() == "loaded") {
				var that = this;
				Main.init(game, function () {
					that.loaded = true;
					animationManager.init();
					debug.log("Game", "Game loaded");
				});
			}
		} else {
			Main.update();
		}
	};

	var game = new Game();
	return game;
});