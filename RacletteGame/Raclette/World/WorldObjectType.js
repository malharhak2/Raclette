define (["rDebug"], function (debug) {
	var WorldObjectType = function (args) {
		this.layer = args.layer;
		this.id = args.id;
		this.physics = args.physics;
		this.render = args.render;
		this.defaultState = args.defaultState || "idle";
		this.defaultDir = args.defaultDir || "none";
	};

	return WorldObjectType;
})