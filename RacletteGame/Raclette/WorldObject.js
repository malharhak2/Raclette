define (["Raclette/Debug", "Raclette/CONFIG", "Raclette/utils", "Raclette/Physics", "Raclette/Renderer"], 
	function (debug, config, utils, physics, Renderer) {
	var WorldObject = function (args) {
		this.type = args.type;
		this.name = args.name || args.type;
		this.id = args.id;
		this.layer = args.layer;
		this.physicsType = args.physicsType;
		if (args.physicsType == "block") {
			this.physics = physics.instanceBlock ({
				id : args.type,
				x : args.position.x,
				y : args.position.y,
				userData : args.userData,
				tags : args.tags
			});
		} else if (args.physicsType == "physical") {		
			this.physics = physics.instancePhysicalObject(args.physics);
		} else if (args.physicsType == "none") {
			this.physics = {
				x : args.position.x,
				y : args.position.y
			};
		}

		this.image = args.image || args.type;
		this.renderType = args.renderType;
		this.state = args.state || args.defaultState;
		this.dir = args.dir || args.defaultDir;
		this.customProps = args.customProps;
		this.attachRenderer();
	};

	WorldObject.prototype.GetPosition = function () {
		var pos = this.physics.body.GetPosition();
		var result = {
			x : pos.x * config.unitSize,
			y : pos.y * config.unitSize
		};
		return result;
	};

	WorldObject.prototype.attachRenderer = function () {
		debug.log("Attach renderer", this.physicsType);
		this.renderer = new Renderer ({
			type : this.renderType,
			name : this.name,
			image : this.image,
			width : this.physics.width,
			height : this.physics.height,
			position : this.GetPosition(),
			state : this.state,
			dir : this.dir
		});
	};

	WorldObject.prototype.update = function () {
		this.renderer.update({
			position : this.GetPosition(),
			state : this.state,
			dir : this.dir
		});
	}

	WorldObject.prototype.render = function () {
		this.renderer.render();
	}

	return WorldObject;
})