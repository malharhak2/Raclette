define(["Raclette/Debug", "Raclette/TilesManager", "Raclette/MapLoader", "Raclette/Rendering", "Raclette/World", "Raclette/utils", "Raclette/Gamepad", "game/Main", "Raclette/inputsManager", "Raclette/Loader", "Raclette/InterfaceManager", "Raclette/Camera"], function(debug, tilesManager, mapLoader, rendering, World, utils, gamepad, Main, InputsManager, loader, interfaceManager, Camera) {
	function Game() {
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
			debug.log("Game", map);
		});
		debug.log("Game", tilesManager);

	}
	Game.prototype.render = function() {
		if (!this.loaded) {
			loader.render(rendering.pageManager.ctx);
			return;
		}
		rendering.cleanCanvas();
		this.interfaceManager.renderBegin(); 
		var objects = this.world.getAllObjects();
		for (var i = 0; i< objects.length; i++) {
			if (objects[i] == null) continue;
			if (!objects[i].trigger) {
				var result = this.camera.isObjectVisible({
					angle: objects[i].body.GetAngle(),
					x: utils.pixels(objects[i].body.GetPosition().x) - utils.pixels(objects[i].width /2) - utils.pixels(objects[i].imageOffset.x),
					y: utils.pixels(objects[i].body.GetPosition().y) - utils.pixels(objects[i].height /2) - utils.pixels(objects[i].imageOffset.y),
					w: utils.pixels(objects[i].imageWidth*2),
					h: utils.pixels(objects[i].imageHeight*2),
					image: objects[i].image,
					renderer: objects[i].renderer
				});
				if (result != "hidden") {
					rendering.renderObject({
						angle: result.angle,
						x: result.x,
						y: result.y,
						w: result.w,
						h: result.h,
						image: result.image,
						renderer: result.renderer
					});
				}
				
			} else {
				rendering.renderSquare ({
					angle: objects[i].body.GetAngle(),
					x: utils.pixels(objects[i].body.GetPosition().x) + utils.pixels(objects[i].width /2),
					y: utils.pixels(objects[i].body.GetPosition().y) + utils.pixels(objects[i].height /2),
					w: utils.pixels(objects[i].width*2),
					h: utils.pixels(objects[i].height*2)
				});
			}
		};
		this.interfaceManager.renderEnd();
	};

	Game.prototype.logic = function() {
		this.gamepads = gamepad.gamepads; 
		if (!this.loaded) {
			if (loader.update() == "loaded") {
				Main.init(game);
				console.log("INIT")
				this.loaded = true;
			}
		} else {
			Main.update(); // We update YOUR game
		}
	};

	var game = new Game();
	return game;
});