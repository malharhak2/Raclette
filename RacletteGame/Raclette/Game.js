define(["Raclette/Debug", "Raclette/AnimationManager", "Raclette/TilesManager", "Raclette/MapLoader", "Raclette/Rendering", "Raclette/World", "Raclette/utils", "Raclette/Gamepad", "game/Main", "Raclette/inputsManager", "Raclette/Loader", "Raclette/InterfaceManager", "Raclette/Camera"], 
	function(debug, animationManager, tilesManager, mapLoader, rendering, World, utils, gamepad, Main, InputsManager, loader, interfaceManager, Camera) {
	function Game() {
		debug.log("Game", "Creating game...");
		this.world = World;
		gamepad.init();
		this.gamepads = gamepad.gamepads;
		this.pageManager = rendering.pageManager;
		this.width = this.pageManager.canvas.width;
		this.height = this.pageManager.canvas.height;
		this.camera = new Camera;
		this.inputsManager = new InputsManager;
		this.interfaceManager = interfaceManager; 
		this.utils = utils;
		this.loaded = false;
		mapLoader.loadMap("01", function (map) {
		});
		debug.log("Game", "Game created");
	};
	
	Game.prototype.render = function() {
		if (!this.loaded) {
			loader.render(rendering.pageManager.ctx);
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