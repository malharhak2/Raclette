define(["rDebug", "rutils", "rWorldLayer", "rWorldObjectType", "rWorldObject", "rWorldMapObject", "rCONFIG", "rbox2d", "rAnimationManager", "rPhysics"], 
	function(debug, utils, WorldLayer, WorldObjectType, WorldObject, WorldMapObject, CONFIG, Box2D, animationManager, physics){ 
	function World () {
		this.physics = physics;
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
		this.physics.initWorld(gravity);
		debug.log("World", "World initialized !");
	};

	World.prototype.createObjectType = function (args) {
		this.objectTypes[args.id] = new WorldObjectType(args);
		if (args.physics) {
			this.createPhysicalObjectType(args.physics);
		} else if (args.physicsType == "block") {
			this.createBlockType({
				id : args.id
			});
		}
		debug.log("World", "World class created !");
	};
	World.prototype.createPhysicalObjectType = function(args) {
		this.physics.createPhysicalObjectType(args);
	};

	World.prototype.createBlockType = function (args) {
		debug.log("World", "creating block type...");
		this.physics.createPhysicalObjectType({
			id : args.id,
			shape : "square",
			width : 1,
			height : 1,
			density : 1,
			friction : 1,
			restitution : 0
		});
		debug.log("World", "Block type created !");
	};

	World.prototype.instanceObject = function (args) {
		var klass = this.objectTypes[args.type];
		args.renderType = klass.renderType;
		args.image = klass.image;
		args.defaultState = klass.defaultState;
		args.defaultDir = klass.defaultDir;
		args.physicsType = klass.physicsType;
		this.layers[args.layer].objects[args.id] = new WorldObject(args);
		return this.layers[args.layer].objects[args.id];
	};

	World.prototype.createDistanceJoint = function(body1,body2,anchor1,anchor2) {	
		this.physics.createDistanceJoint(body1, body2, anchor1, anchor2);
	};

	World.prototype.instancePhysicalObject = function (args) {
		return this.physics.instancePhysicalObject(args);
	};

	World.prototype.removeObject = function(layer, id) {
		this.physics.removeObject(this.layers[layer].objects[id].physics);
		delete this.layers[layer].objects[id];
	};

	World.prototype.update = function() { 
		this.physics.update();
		for (var i in this.layers) {
			for (var j in this.layers[i].objects) {
				this.layers[i].objects[j].update();
			}
		};
	};

	World.prototype.render = function () {
		for (var i in this.layers) {
			for (var j in this.layers[i].objects) {
				this.layers[i].objects[j].render();
			}
		};
		this.physics.DrawDebugData();
	};

	World.prototype.getAllObjects = function() {
		return this.layers;
	}
	World.prototype.getObject = function(layer, id) {
		return this.layers[layer].objects[id];
	}
	return new World();
});