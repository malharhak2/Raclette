define (["rWorld", "rDebug", "rCONFIG", "rutils", "rCurrentWorld"], 
function (World, debug, config, utils, currentWorld) {
	
	var WorldManager = function () {
		this.worlds = {};
		this.currentWorld = 0;
	};

	WorldManager.prototype.deleteWorld = function (id) {
		delete this.worlds[id];
	};

	WorldManager.prototype.pushWorld = function (args) {
		debug.log("coucou", World);
		this.worlds[args.id] = new World(args);
		return this.worlds[args.id];
	};

	WorldManager.prototype.GetWorld = function (id) {
		return this.worlds[id];
	};

	WorldManager.prototype.initWorld = function (id, args) {
		this.worlds[id].init (args);
	};

	WorldManager.prototype.switchWorld = function (id) {
		this.currentWorld = currentWorld.currentWorld = this.worlds[id];
	}

	return new WorldManager();
});