define (["Raclette/Debug", "Raclette/Physics"], function (debug, physics) {
	var WorldObject = function (args) {
		this.type = args.type;
		this.layer = args.layer;
		this.physics = physics.instancePhysicalObject(args.physics);
		this.image = args.image || args.type;
		this.renderType = this.objectTypes[args.type].renderType;
	};

	return WorldObject;
})