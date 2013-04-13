define(["rutils", "rDebug", "rCONFIG", "game/Map", "game/Player", "game/config", "game/scrolling", "rWorld", "rTilesManager", "rCamera", "rinputsManager", "rCanvasManager", "rWorldManager"], 
	function(utils, debug, rconfig, map, Player, config, scrolling, world, tilesManager, camera, inputsManager, canvasManager, worldManager){
	var moteur;
	var player;
	var playerCreated = 0;

	var Maingame = function () {

	};
	Maingame.prototype.init = function (callback) {
		player = new Player();
		var that = this;		
		map.init("01", function (map) {
			var world = worldManager.pushWorld ({
				id : "mainWorld",
				gravity : {
					x : 0,
					y : 8
				},
				map : map
			});
			that.onMapLoad(map, callback);
		});
	};

	Maingame.prototype.onMapLoad = function (map, callback) {

		var world = worldManager.GetWorld ("mainWorld");
		world.init();
		worldManager.switchWorld ("mainWorld");

		world.createObjectType({
			layer : "Foreground",
			id : "rock",
			render : {
				offset : {
					x : 0,
					y : 0
				},
				width : 1,
				height : 1,
				image : "tileset",
				type : "tileset"
			},
			physics : {
				width : 1,
				height : 1,
				static : false,
				type : "block"
			}
		});		
		world.createObjectType({
			layer : "Foreground",
			id : "platform",
			render : {
				offset : {
					x : 0,
					y : 0
				},
				width : 1,
				height : 1,
				image : "tileset",
				type : "tileset"
			},
			physics : {
				width : 1,
				height : 1,
				static : false,
				type : "platform"
			}
		});
		world.createObjectType ( {
			layer : "Foreground",
			id : "void",
			render : {
				offset : {
					x : 0,
					y : 0
				},
				width : 1,
				height : 1,
				image : "tileset",
				type : "tileset"
			},
			physics : {
				width : 1,
				height : 1,
				static : false,
				type : "void"
			}
		});

		world.createObjectType({
			id: "player", 
			layer : "Foreground",
			defaultState : "move",
			defaultDir : "right",
			render : {
				offset : {
					x : 0,
					y : 0
				},
				width : 2,
				height : 1,
				image : "handshroomWhite",
				type : "spritesheet"
			},
			physics : {
				mass : 0.03,
				width : 2,
				height : 1,
				static : false,
				type : "character"
			}
		});
		var offset = utils.metters(config.width/5);

		var mapObjects = map.CreateObjects ();
		for (var i in mapObjects) {
			if (mapObjects[i] != false) {
				world.instanceStatic (mapObjects[i]);
			}
		};

		player.init(world.instanceObject({
			type : "player",
			layer : "Foreground",
			id : "player0",
			position : {
				x : 5,
				y : 5
			},
			onCollision : function (args) {
				player.onCollision(args);
			}
		}));
		if (callback) {
			callback();
		}
	}



	Maingame.prototype.update = function () {
		scrolling ({
			x: player.GetPosition().x, 
			y: player.GetPosition().y
		});
			if (inputsManager.isPressed("right")) {
				player.moveRight(inputsManager.getKey("right"));
			} else if (inputsManager.isPressed("left")) {
				player.moveLeft(inputsManager.getKey("left"));
			} else {
				player.stayStill();
			} if (inputsManager.isPressed("jump")) {
				player.jump();
			}
		player.update();
		worldManager.currentWorld.update();	
	};

	Maingame.prototype.render = function () {
		worldManager.currentWorld.render();
	};

return new Maingame();
});