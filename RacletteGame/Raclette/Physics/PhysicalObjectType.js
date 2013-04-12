define (["rDebug", "rbox2d", "rutils"], function (debug, B2D, utils) {
	var PhysicalObjectType = function (args) {
		debug.log("PhysicalObjectType", "Physical class Creation...");
		this.fixtureDef = new B2D.Dynamics.b2FixtureDef();
		this.fixtureDef.density = args.density;
		this.fixtureDef.friction = args.friction;
		this.fixtureDef.restitution = args.restitution;
		this.fixtureDef.height = args.height;
		this.fixtureDef.width = args.width;
		this.fixtureDef.fixedRotation = args.fixedRotation || false;
		this.fixtureDef.noGravity = args.noGravity || false;
		this.fixtureDef.weight = args.weight || 1;
		if (args.category != null) {
			this.fixtureDef.filter.categoryBits = args.category;
		}
		if (args.mask != null) {
			this.fixtureDef.filter.maskBits = args.mask;
		}
		if (args.trigger) {
			this.fixtureDef.isSensor = true;
			this.fixtureDef.trigger = true;
		}
		if (args.shape == "square") {
			this.fixtureDef.shape = new B2D.Collision.Shapes.b2PolygonShape;
			this.fixtureDef.shape.SetAsBox(args.width / 2, args.height / 2);
		}
		if (args.shape == "round") {
			this.fixtureDef.shape =  new B2D.Collision.Shapes.b2CircleShape(args.width / 2);
		}
		debug.log("PhysicalObjectType", "Physical class created");
	};

	return PhysicalObjectType;
})