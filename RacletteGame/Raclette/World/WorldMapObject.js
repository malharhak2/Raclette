define (["rPhysics"], function (physics) {
	var WorldMapObject = function (args) {
		this.type = args.type;
		this.x = args.x;
		this.y = args.y;
		this.layer = args.layer;
		this.image = args.image || false;
		if (args.physicsType == "block") {
			this.physics = physics.instanceBlock({
				id : args.type,
				x : args.x,
				y : args.y,
				userData : args.userData,
				tags : args.tags
			});
		} else if (args.physicsType == "physical") {
			this.physics = physics.instancePhysicalObject(args.physics);
		}
	};

	return WorldMapObject;
})