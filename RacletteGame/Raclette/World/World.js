define(["rDebug", "rutils", "rWorldLayer", "rWorldObjectType", "rWorldObject", "rWorldMapObject", "rCONFIG", "rAnimationManager"], 
	function(debug, utils, WorldLayer, WorldObjectType, WorldObject, WorldMapObject, CONFIG, animationManager){ 
	function World () {
		this.objectTypes = {}; 
		this.layers = {
			"Background" : new WorldLayer("Background"),
			"Midground" : new WorldLayer("Midground"),
			"Foreground" : new WorldLayer("Foreground"),
			"Objects" : new WorldLayer("Objects")
		};
		this.objects = {};
	}
	World.prototype.init = function(gravity, map) {
		debug.log("World", "Initializing world...");
		for (var i in this.layers) {
			this.layers[i].GenerateStatics(map);
		}
		debug.log("World", "World initialized !");
	};

	World.prototype.createObjectType = function (args) {
		this.objectTypes[args.id] = new WorldObjectType(args);
		debug.log("World", "World class created !");
	};

	World.prototype.CreateObject = function (args) {
		var klass = this.objectTypes[args.type];
		args.render = klass.render;
		args.defaultState = klass.defaultState;
		args.defaultDir = klass.defaultDir;
		args.physics = klass.physics;
		args.physics.position = args.position;	
		args.physics.onCollision = args.onCollision;
		return args;	
	}
	World.prototype.instanceObject = function (args) {
		var obj = this.CreateObject (args);
		this.layers[args.layer].objects[args.id] = new WorldObject(obj);
		return this.layers[args.layer].objects[args.id];
	};

	World.prototype.instanceStatic = function (args) {
		var obj = this.CreateObject (args);
		this.layers[args.layer].statics[args.position.y][args.position.x] = new WorldObject(obj);
		return this.layers[args.layer].statics[args.position.y][args.position.x];
	}

	World.prototype.removeObject = function(layer, id) {
		delete this.layers[layer].objects[id];
	};

	World.prototype.update = function() { 
		for (var i in this.layers) {
			for (var j in this.layers[i].objects) {
				this.layers[i].objects[j].collider.update (this.layers["Foreground"].statics);
				this.layers[i].objects[j].update();
			}
		};
	};

	World.prototype.render = function  () {
		for (var i in this.layers) {
			this.renderStatics(this.layers[i].statics);
			for (var j in this.layers[i].objects) {
				this.layers[i].objects[j].render();
			}
		};
	};

	World.prototype.renderStatics = function (statics) {
		for (var i = 0; i < statics.length; i++) {
			for (var j = 0; j < statics[i].length; j++) {
				if (statics[i][j].render) {
					statics[i][j].render();
				}
			}
		}
	};

	World.prototype.getAllObjects = function() {
		return this.layers;
	}
	World.prototype.getObject = function(layer, id) {
		return this.layers[layer].objects[id];
	}
	return new World();
});