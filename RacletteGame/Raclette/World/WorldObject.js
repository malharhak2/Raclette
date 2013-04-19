define (["rDebug", "rCONFIG", "rutils", "rCollider", "rRenderer", "rMessager"], 
	function (debug, config, utils, Collider, Renderer, messager) {
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
		this.activated = true;
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
	};

	WorldObject.prototype.destroy = function () {
		messager.sendMessage("currentWorld", {
			inst : "destroyObject",
			args : {
				layer : this.layer,
				id : this.id,
			}
		});
	};

	return WorldObject;
})