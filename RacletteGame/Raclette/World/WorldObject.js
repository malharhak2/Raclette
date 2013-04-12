define (["rDebug", "rCONFIG", "rutils", "rCollider", "rRenderer"], 
	function (debug, config, utils, Collider, Renderer) {
	var WorldObject = function (args) {
		this.type        = args.type;
		this.name        = args.name || args.type;
		this.id          = args.id;
		this.layer       = args.layer;
		this.image       = args.image || args.type;
		this.state       = args.state || args.defaultState;
		this.dir         = args.dir || args.defaultDir;
		this.customProps = args.customProps;
		this.AttachCollider (args.physics);
		this.AttachRenderer (args.render);
	};

	WorldObject.prototype.AttachCollider = function (args) {
		this.collider = new Collider (args);
	}

	WorldObject.prototype.GetPosition = function () {
		var pos = this.collider.GetPosition();
		return pos;
	};

	WorldObject.prototype.AttachRenderer = function (args) {
		args.position = this.GetPosition();
		args.name = this.name;
		args.state = this.state;
		args.dir = this.dir;
		this.renderer = new Renderer (args);
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
		this.collider.render();
	}

	return WorldObject;
})