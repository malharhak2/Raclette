define (["rDebug"], function (debug) {
	var WorldObjectType = function (args) {
		debug.log("WorldObjectType", "Creatig world object type", args);
		this.parent = parent;
		this.renderType = args.renderType;
		this.image = args.image || args.id;
		this.layer = args.layer;
		this.id = args.id;
		this.physicsType = args.physicsType;
		this.physics = args.physics;
		this.defaultState = args.defaultState || "idle";
		this.defaultDir = args.defaultDir || "none";
		debug.log("WorldObjectType", "Created !");
	};

	return WorldObjectType;
})