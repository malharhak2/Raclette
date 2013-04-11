define (["rDebug", "rbox2d"], function (debug, b2d) {
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
		this.noGravity = args.noGravity;
		this.trigger = args.trigger;
		this.tags = args.tags;
	};

	PhysicalObject.prototype.ApplyForce = function (force, point) {
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