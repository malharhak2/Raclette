define (["rDebug", "rbox2d", "rutils", "rCONFIG"], function (debug, b2d, utils, config) {
	var PhysicalObject = function (args, b2world) {
		this.bodyDef = new b2d.Dynamics.b2BodyDef;
		if (args.fixe) {
			this.bodyDef.type = b2d.Dynamics.b2Body.b2_staticBody;
		} else {
			this.bodyDef.type = b2d.Dynamics.b2Body.b2_dynamicBody;
		}
		this.bodyDef.position.x = args.x;
		this.bodyDef.position.y = args.y;
		this.bodyDef.userData = args.userData || {};
		this.bodyDef.userData.id = args.indexObject;
		if (!args.typeId) {
			debug.error("Physics", args.typeId);
		}
		this.bodyDef.fixedRotation = args.fixedRotation;
		
		this.id = args.index;
		this.typeId = args.typeId;
		this.body = b2world.CreateBody(this.bodyDef).CreateFixture(args.fixtureDef).GetBody();
		this.width = args.width;
		this.height = args.height;
		this.weight = args.weight || 1;
		this.noGravity = args.noGravity;
		this.trigger = args.trigger;
		this.tags = args.tags;
	};

	PhysicalObject.prototype.ApplyForce = function (force, point) {	
		if (utils.chances (50) && this.typeId == "player") {
			debug.log("Apply Force", this.weight);
		}
		force = {
			x : force.x * this.weight * this.width,
			y : force.y * this.weight * this.height
		};
		this.body.ApplyForce(force, point);
	}

	PhysicalObject.prototype.GetMass = function () {
		return this.body.GetMass();
	}
	PhysicalObject.prototype.GetWorldCenter = function () {
		return this.body.GetWorldCenter();
	}

	return PhysicalObject;
});