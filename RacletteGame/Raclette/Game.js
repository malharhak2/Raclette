define(["Raclette/Debug", "Raclette/AnimationManager", "Raclette/TilesManager", "Raclette/MapLoader", "Raclette/World", "Raclette/utils", "Raclette/Gamepad", "game/Main", "Raclette/inputsManager", "Raclette/Loader", "Raclette/Camera", "Raclette/CanvasManager"], 
	function(debug, animationManager, tilesManager, mapLoader, World, utils, gamepad, Main, InputsManager, loader, Camera, canvasManager) {
	function Game() {
		debug.log("Game", "Creating game...");
		this.world = World;
		gamepad.init();
		this.gamepads = gamepad.gamepads;
		this.width = canvasManager.canvasWidth;
		this.height = canvasManager.canvasHeight;
		this.camera = new Camera;
		this.inputsManager = new InputsManager;
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
			rendering.cleanCanvas();
		}
	};

	Game.prototype.logic = function() {
		this.gamepads = gamepad.gamepads; 
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