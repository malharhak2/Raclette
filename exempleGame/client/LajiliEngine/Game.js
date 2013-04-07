// See my super games on http://lajili.com
define(["LajiliEngine/Rendering", "LajiliEngine/World", "LajiliEngine/utils","LajiliEngine/Gamepad", "Game/Main", "LajiliEngine/inputsManager", "LajiliEngine/Loader", "LajiliEngine/InterfaceManager", "LajiliEngine/Camera"], function(rendering, World, utils, gamepad, Main, InputsManager, loader, interfaceManager, Camera)
{
	//Creating the world

	function Game()
	{
		this.world = new World; // We create the physical world
		gamepad.init(); // We initialize the gamepad
		this.gamepads = gamepad.gamepads; // We gave the game the gamepad, for rapid access.
		this.pageManager = rendering.pageManager;
		this.width = this.pageManager.canvas.width; //We get the width and the height, if we need it later on
		this.height = this.pageManager.canvas.height;
		this.camera = new Camera;
		this.inputsManager = new InputsManager; //We instanciate a
		//this.inputsManager.init();
		this.interfaceManager = interfaceManager; 
		this.utils = utils
		this.loaded = false;

	}

	Game.prototype.render = function()  // The main render function.
	{
		if (!this.loaded)
		{
			loader.render(rendering.pageManager.ctx);
			return;
		}
		rendering.cleanCanvas();
		this.interfaceManager.renderBegin(); 
		var objects = this.world.getAllObjects();
		//console.log("getAllObjects", objects.length);
		//console.log("worldObjects",this.world.objects.length)
		for (var i = 0; i< objects.length; i++)
		{
			if (objects[i] == null) continue;
			if (!objects[i].trigger)
			{
				var result = this.camera.isObjectVisible({
					angle: objects[i].body.GetAngle(),
					x: utils.pixels(objects[i].body.GetPosition().x) - utils.pixels(objects[i].width /2) - utils.pixels(objects[i].imageOffset.x),
					y: utils.pixels(objects[i].body.GetPosition().y) - utils.pixels(objects[i].height /2) - utils.pixels(objects[i].imageOffset.y),
					w: utils.pixels(objects[i].imageWidth*2),
					h: utils.pixels(objects[i].imageHeight*2),
					image: objects[i].image,
					renderer: objects[i].renderer
				})
				if (result != "hidden")
				{
					rendering.renderObject({
					angle: result.angle,
					x: result.x,
					y: result.y,
					w: result.w,
					h: result.h,
					image: result.image,
					renderer: result.renderer
					})
				}
				
			}
			else
			{
				rendering.renderSquare(
				{
					angle: objects[i].body.GetAngle(),
					x: utils.pixels(objects[i].body.GetPosition().x) + utils.pixels(objects[i].width /2),
					y: utils.pixels(objects[i].body.GetPosition().y) + utils.pixels(objects[i].height /2),
					w: utils.pixels(objects[i].width*2),
					h: utils.pixels(objects[i].height*2)
				})
			}
		}
		this.interfaceManager.renderEnd();
	}

	Game.prototype.logique = function()
	{
		this.gamepads = gamepad.gamepads; 
		if (!this.loaded)
		{
			if (loader.update() == "loaded")
			{
				Main.init(game);
				console.log("INIT")
				this.loaded = true;
			}
		}
		else
		{
			Main.update(); // We update YOUR game

		}

		
	}
	var game = new Game(); // We create the game here, so it's unique and accessible with require(["LajiliEngine/Game"])

	return game;
}
);