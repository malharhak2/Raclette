define (["rDebug", "rCONFIG", "rutils", "rPhysics", "rRenderer"], 
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
			var that = this;
			this.physics = {
				x : args.position.x,
				y : args.position.y,
				width : args.width,
				height : args.height,
				body : {
					GetPosition : function () {
						return {
							x : that.physics.x, 
							y : that.physics.y
						}
					},
					GetLinearVelocity : function () {
						return {
							x : 0,
							y : 0
						}
					}
				}
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
			x : pos.x - this.physics.width / 2,
			y : pos.y - this.physics.height / 2
		};
		return result;
	};

	WorldObject.prototype.GetLinearVelocity = function () {
		return this.physics.body.GetLinearVelocity();
	}

	WorldObject.prototype.SetLinearVelocity = function (velocity) {
		if (velocity.x === undefined) {
			velocity.x = this.physics.body.GetLinearVelocity().x;
		}
		if (velocity.y === undefined) {
			velocity.y = this.physics.body.GetLinearVelocity().y;
		}
		this.physics.body.SetLinearVelocity(velocity);
	}
	WorldObject.prototype.ApplyForce = function (force, point) {
		this.physics.body.ApplyForce(force, point);
	};

	WorldObject.prototype.attachRenderer = function () {
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