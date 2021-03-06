define(["rDebug", "rTime", "rAnimationManager", "rTilesManager", "rMapLoader", "rWorld", "rutils", "rGamepad", "game/Main", "rinputsManager", "rLoader", "rCamera", "rCanvasManager", "rInterfaceManager", "rUser", "rWorldManager"], 
	function(debug, time, animationManager, tilesManager, mapLoader, World, utils, gamepad, Main, inputsManager, loader, Camera, canvasManager, interfaceManager, user, worldManager) {
	function Game() {
		debug.log("Game", "Creating game...");
		gamepad.init();
		this.gamepads = gamepad.gamepads;
		this.width = canvasManager.canvasWidth;
		this.height = canvasManager.canvasHeight;
		this.camera = Camera;
		this.inputsManager = inputsManager;
		this.interfaceManager = interfaceManager; 
		this.utils = utils;
		this.loaded = false;
		mapLoader.loadMap("01", function (map) {
		});
		debug.log("Game", "Game created");
	};
	
	Game.prototype.init = function (callback) {
		var that = this;
		debug.log(user);
		user.init (function () {
			callback();
		});
	};
	Game.prototype.render = function() {
		if (!this.loaded) {
			loader.render(canvasManager.ctx);
		} else {
			canvasManager.cleanCanvas();
			this.interfaceManager.renderBegin();
			this.interfaceManager.renderEnd();
			Main.render();
		}
		tilesManager.animate();
	};

	Game.prototype.logic = function() {
		time.currentFrame = Date.now();
		time.update();
		inputsManager.update();
		if (!this.loaded) {
			if (loader.update() == "loaded") {
				this.loaded = true;
				var that = this;
				this.loaded = true;
				Main.init(function () {
					that.loaded = true;
					animationManager.init();
					debug.log("Game", "Game loaded");
				});
			}
		} else {
			Main.update();
		}
		time.lastFrame = Date.now();
	};

	var game = new Game();
	return game;
});