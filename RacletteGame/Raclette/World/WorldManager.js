define (["rWorld", "rDebug", "rCONFIG", "rutils", "rCurrentWorld", "rWorldObjectType"], 
function (World, debug, config, utils, currentWorld, WorldObjectType) {
	
	var WorldManager = function () {
		this.worlds = {};
		this.objectTypes = {};
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

	WorldManager.prototype.createObjectType = function (args) {
		this.objectTypes[args.id] = new WorldObjectType(args);
	};
	WorldManager.prototype.giveObjectTypes = function () {
		this.currentWorld.objectTypes = this.objectTypes;
	}

	return new WorldManager();
});