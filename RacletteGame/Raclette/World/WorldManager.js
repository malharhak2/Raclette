define (["rWorld", "rDebug", "rCONFIG", "rutils"], 
function (World, debug, config, utils) {
	
	var WorldManager = function () {
		this.worlds = {};
	};

	WorldManager.prototype.deleteWorld = function (id) {
		delete this.worlds[id];
	};

	WorldManager.prototype.pushWorld = function (args) {
		this.worlds[args.id] = new World(args);
		return this.worlds[args.id];
	};

	WorldManager.prototype.GetWorld = function (id) {
		return this.worlds[id];
	};

	WorldManager.prototype.initWorld = function (id, args) {
		this.worlds[id].init (args);
	};

	return new WorldManager();
});