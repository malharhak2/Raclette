define(["Raclette/Debug", "Raclette/CONFIG", "Raclette/box2d", "Raclette/AnimationManager", "Raclette/Physics"], function(debug, CONFIG, Box2D, animationManager, physics){ 
	var indexObject = 0; 
	function World () {
		this.physics = physics;
		this.objectTypes = {}; 
		this.callStack = [];
		this.gravity = {x: 0, y:0}
		this.layers = {};
	}
	World.prototype.init = function(gravity, map) {
		this.physics.initWorld(gravity);
		if (map) {
			this.mapWidth = map.width;
			this.mapHeight = map.height;
			for (var k = 0; k < map[0][0].length; k++) {
				this.layers[k] = [];
				for (var i = 0; i < map.height; i++) {
					this.layers[k][i] = [];
					for (var j = 0; j < map.width; j++) {
						this.layers[k][i][j] = false;
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
		this.instancePhysicalObject({
			typeId : args.id,
			fixe : true,
			x : args.x,
			y : args.y,
			userData : args.userData,
			tags : args.tags
		});
	};

	World.prototype.instanceObject = function (args) {
		this.layers[args.layer][args.y][args.x] = {
			type : args.type,
			layer : args.layer,
			image : args.image || false
		};
		if (this.objectTypes[args.type].physicsType == "block") {
			this.instanceBlock({
				id : args.type,
				x : args.x,
				y : args.y,
				userData : args.userData,
				tags : args.tags
			});
		} else if (this.objectTypes[args.type].physicsType == "physical") {
			this.instancePhysicalObject(args.physicStuff);
		}
	};

	World.prototype.createDistanceJoint = function(body1,body2,anchor1,anchor2) {	
		this.physics.createDistanceJoint(body1, body2, anchor1, anchor2);
	};

	World.prototype.instancePhysicalObject = function (args) {
		physics.instancePhysicalObject(args.typeId, args.fixe, args.x, args.y, args.userData, args.tags);
	};

	World.prototype.removeObject = function(cible) {
		this.callStack.push({
			object: cible.body
		});
	};

	World.prototype.update = function() { 
		this.physics.update();
	};
	World.prototype.getAllObjects = function() {
		return this.objects;
	}
	World.prototype.getObject = function(id) {
		return this.objects[id];
	}
	return new World();
});