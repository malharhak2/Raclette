define(["Raclette/Debug", "Raclette/WorldObjectType", "Raclette/WorldObject", "Raclette/CONFIG", "Raclette/box2d", "Raclette/AnimationManager", "Raclette/Physics"], function(debug, WorldObjectType, WorldObject, CONFIG, Box2D, animationManager, physics){ 
	function World () {
		this.physics = physics;
		this.objectTypes = {}; 
		this.callStack = [];
		this.gravity = {x: 0, y:0}
		this.layers = {};
		this.objects = {};
	}
	World.prototype.init = function(gravity, map) {
		debug.log("World", "Initializing world...");
		this.physics.initWorld(gravity);
		debug.log("World", map);
		if (map) {
			this.mapWidth = map.width;
			this.mapHeight = map.height;
			for (var k in map.level[0][0]) {
				this.layers[k] = [];
				for (var j = 0; j < map.height; j++) {
					this.layers[k][j] = [];
					for (var i = 0; i < map.width; i++) {
						this.layers[k][j][i] = false;
					};
				};
			};
		}
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

	World.prototype.instanceBlock = function (args) {
		return this.physics.instanceBlock (args);
	};

	World.prototype.instanceMapObject = function (args) {
		args.physicsType = this.objectTypes[args.type].physicsType;
		this.layers[args.layer][args.y][args.x] = new WorldMapObject(args);
	};

	World.prototype.instanceObject = function (args) {
		this.objects[args.id] = new WorldObject(args);
	};

	World.prototype.createDistanceJoint = function(body1,body2,anchor1,anchor2) {	
		this.physics.createDistanceJoint(body1, body2, anchor1, anchor2);
	};

	World.prototype.instancePhysicalObject = function (args) {
		return physics.instancePhysicalObject(args);
	};

	World.prototype.removeObject = function(id) {
		this.physics.removeObject(this.objects[id].physics.body);
		delete this.objects[id];
	};

	World.prototype.removeCase = function (layer, x, y) {
		this.physics.removeObject(this.layers[layer][y][x].physics.body);
		this.layers[layer][y][x] = false;

	}

	World.prototype.update = function() { 
		this.physics.update();
	};
	World.prototype.getAllObjects = function() {
		return this.objects;
	}
	World.prototype.getObject = function(id) {
		return this.objects[id];
	}
	World.prototype.getAllCases = function () {
		return this.layers;
	}
	World.prototype.getCase = function (layer, x, y) {
		return this.layers[layer][y][x];
	}
	return new World();
});