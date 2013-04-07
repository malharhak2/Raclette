define(["Raclette/Debug", "Raclette/CONFIG", "Raclette/box2d", "Raclette/AnimationManager", "Raclette/Physics"], function(debug, CONFIG, Box2D, animationManager, physics){ 
	var indexObject = 0; 
	function World () {
		this.physics = physics;
		this.objectTypes = {}; 
		this.callStack = [];
		this.gravity = {x: 0, y:0}
		this.layers = {};
		this.objects = {};
	}
	World.prototype.init = function(gravity, map) {
		this.physics.initWorld(gravity);
		if (map) {
			this.mapWidth = map.width;
			this.mapHeight = map.height;
			for (var k = 0; k < map[0][0].length; k++) {
				this.layers[k] = [];
				for (var j = 0; j < map.height; j++) {
					this.layers[k][j] = [];
					for (var i = 0; i < map.width; i++) {
						this.layers[k][j][i] = false;
					};
				};
			};
		}
	};

	World.prototype.createObjectType = function (args) {
		this.objectTypes[args.id] = {
			renderType : args.renderType, //tileset ou image
			layer : args.layer,
			id : args.id,
			physicsType : args.physicsType
		};
		if (args.physics) {
			this.createPhysicalObjectType(args.physics);
		} else if (args.staticBlock) {
			this.createBlockType({
				id : args.id
			});
		}
	};
	World.prototype.createPhysicalObjectType = function(args) {
		this.physics.createPhysicalObjectType(args);
	};

	World.prototype.createBlockType = function (args) {
		this.physics.createPhysicalObjectType({
			id : args.id,
			shape : "square",
			width : 1,
			height : 1,
			density : 1,
			friction : 1,
			restitution : 0
		});
	};

	World.prototype.instanceBlock = function (args) {
		return this.instancePhysicalObject({
			typeId : args.id,
			fixe : true,
			x : args.x,
			y : args.y,
			userData : args.userData,
			tags : args.tags
		});
	};

	World.prototype.instanceMapObject = function (args) {
		this.layers[args.layer][args.y][args.x] = {
			type : args.type,
			x : args.x,
			y : args.y,
			layer : args.layer,
			image : args.image || false
		};
		if (this.objectTypes[args.type].physicsType == "block") {
			this.layers[args.layers][args.y][args.x].physics = this.instanceBlock({
				id : args.type,
				x : args.x,
				y : args.y,
				userData : args.userData,
				tags : args.tags
			});
		} else if (this.objectTypes[args.type].physicsType == "physical") {
			this.layers[args.layers][args.y][args.x].physics = this.instancePhysicalObject(args.physics);
		}
	};

	World.prototype.instanceObject = function (args) {
		this.objects[args.id] = {
			type : args.type,
			layer : args.layer,
			physics : this.instancePhysicalObject(args.physics)
		};
	};

	World.prototype.createDistanceJoint = function(body1,body2,anchor1,anchor2) {	
		this.physics.createDistanceJoint(body1, body2, anchor1, anchor2);
	};

	World.prototype.instancePhysicalObject = function (args) {
		return physics.instancePhysicalObject(args.typeId, args.fixe, args.x, args.y, args.userData, args.tags);
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