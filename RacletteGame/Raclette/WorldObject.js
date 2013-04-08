define (["Raclette/Debug", "Raclette/Physics", "Raclette/Renderer"], function (debug, physics, Renderer) {
	var WorldObject = function (args) {
		this.type = args.type;
		this.layer = args.layer;
		this.physics = physics.instancePhysicalObject(args.physics);
		this.image = args.image || args.type;
		this.renderType = args.renderType;
		this.state = args.state;
		this.dir = args.dir;
		this.attachRenderer();
	};

	WorldObject.prototype.GetPosition = function () {
		return this.physics.body.GetPosition();
	};

	WorldObject.prototype.attachRenderer = function () {
		this.renderer = new Renderer ({
			type : this.renderType,
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