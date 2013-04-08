define (["Raclette/Debug", "Raclette/AnimationManager"], function (debug, animationManager) {
	var Renderer = function (args) {
		this.type = args.type;
		this.image = args.image;
		this.width = args.width;
		this.height = args.height;
		this.position = args.position;
		this.state = args.state;
		this.dir = args.dir;
	};

	Renderer.prototype.update = function (args) {
		if (this.animation) {
			animationManager.update(this.animation);
		}
		this.position = args.position;
		this.state = args.state;
		this.dir = args.dir;
	}
	Renderer.prototype.init = function () {
		if (this.type == "spritesheet") {
			this.animation = animationManager.createAnim ({
				animName : this.image
			});
		} else if (this.type == "tileset") {

		}
	};

	Renderer.prototype.render = function () {
		var co = this.getRenderCoordinates ();
		var renderInfos = {
			image : this.image,
			sx : co.sx,
			sy : co.sy,
			sw : co.sw,
			sh : co.sh,
			dx : co.dx,
			dy : co.dy,
			dw : co.dw,
			dh : co.dh
		};
	};

	Renderer.prototype.getRenderCoordinates = function () {
		var coordinates = {
			sx : this.animation.coordinates.sx,
			sy : this.animation.coordinates.sy,
			sw : this.animation.coordinates.sw,
			sh : this.animation.coordinates.sh,
			dx : this.position.x,
			dy : this.position.y,
			dw : this.width,
			dh : this.height
		};
		return coordinates;
	};

	return Renderer;
});